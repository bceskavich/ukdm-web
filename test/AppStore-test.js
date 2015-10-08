jest.dontMock('../src/js/stores/AppStore');

describe('AppStore', () => {

  let ServerConnection = require('../src/js/utils/ServerConnection');
  let AppActions = require('../src/js/actions/AppActions.js')
  let alt;
  let callback;
  let AppStore;

  beforeEach(() => {
    alt = require('../src/js/alt');
    alt.dispatcher = { register: jest.genMockFunction() };
    AppStore = require('../src/js/stores/AppStore');
    callback = alt.dispatcher.register.mock.calls[0][0];
  });

  const mockConnection = new ServerConnection('ws://ec2-52-23-221-3.compute-1.amazonaws.com:80');
  const actionConnection = {
    action: AppActions.CONNECTION,
    data: mockConnection
  };

  const mockAppState = 'start';
  const actionSetAppState = {
    action: AppActions.SET_APP_STATE,
    data: mockAppState
  };

  const mockQuestion = 'What is your favorite kind of kid?';
  const actionSetCurrentQuestion = {
    action: AppActions.SET_CURRENT_QUESTION,
    data: mockQuestion
  };

  const mockAnswers = ['One', 'Two', 'Three'];
  const actionSetAnswers = {
    action: AppActions.SET_CURRENT_ANSWERS,
    data: mockAnswers
  };

  const actionReset = {
    action: AppActions.RESET_AND_END,
    data: null
  };

  // Initialization
  describe('#constructor', () => {
    it('registers a callback with the dispatcher', () => {
      expect(alt.dispatcher.register.mock.calls.length).toBe(1);
    });

    it('inits with no server connection', () => {
      const { conn } = AppStore.getState();
      expect(conn).toBe(null);
    });

    it('inits with an appState of "setup"', () => {
      const { appState } = AppStore.getState();
      expect(appState).toBe('setup');
    });

    it('inits with no current question', () => {
      const { question } = AppStore.getState();
      expect(question).toBe('');
    });

    it('inits with no current answers', () => {
      const { answers } = AppStore.getState();
      expect(answers).toEqual([]);
    });
  });

  describe('#onConnection', () => {
    it('sets the connection', () => {
      callback(actionConnection);

      const { conn } = AppStore.getState();
      expect(conn).toBe(mockConnection);
    });
  });

  describe('#onSetAppState', () => {
    it('updates the app state', () => {
      callback(actionSetAppState);

      const { appState } = AppStore.getState();
      expect(appState).toBe(mockAppState);
    });
  });

  describe('#onSetCurrentQuestion', () => {
    it('sets the current question', () => {
      callback(actionSetCurrentQuestion);

      const { question } = AppStore.getState();
      expect(question).toBe(mockQuestion);
    });
  });

  describe('#onSetCurrentAnswers', () => {
    it('sets the array of answers for guessing', () => {
      callback(actionSetAnswers);

      const { answers } = AppStore.getState();
      expect(answers).toBe(mockAnswers);
    });
  });

  describe('#onResetAndEnd', () => {
    it('resets the store', () => {
      callback(actionConnection);
      callback(actionSetAppState);
      callback(actionSetCurrentQuestion);
      callback(actionSetAnswers);

      callback(actionReset);

      const {
        conn,
        appState,
        question,
        answers
      } = AppStore.getState();

      expect(conn).toBe(null);
      expect(appState).toBe('setup');
      expect(question).toBe('');
      expect(answers).toEqual([]);
    });
  });
});
