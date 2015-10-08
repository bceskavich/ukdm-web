jest.dontMock('../src/js/stores/PlayerStore');

describe('PlayerStore', () => {

  let PlayerActions = require('../src/js/actions/PlayerActions.js')
  let alt;
  let callback;
  let PlayerStore;

  beforeEach(() => {
    alt = require('../src/js/alt');
    alt.dispatcher = { register: jest.genMockFunction() };
    PlayerStore = require('../src/js/stores/PlayerStore');
    callback = alt.dispatcher.register.mock.calls[0][0];
  });

  const mockName = 'dollabill$';
  const actionSetPlayerName = {
    action: PlayerActions.SET_PLAYER_NAME,
    data: mockName
  };

  const mockAboutTrue = 'dollabill$';
  const mockAboutFalse = 'messy j';
  const actionSetAboutMeTrue = {
    action: PlayerActions.SET_ABOUT_ME,
    data: mockAboutTrue
  };
  const actionSetAboutMeFalse = {
    action: PlayerActions.SET_ABOUT_ME,
    data: mockAboutFalse
  };

  const actionSubmitVote = {
    action: PlayerActions.SUBMIT_VOTE,
    data: null
  };

  const actionReset = {
    action: PlayerActions.RESET_AND_END,
    data: null
  };

  // Initialization
  describe('#constructor', () => {
    it('registers a callback with the dispatcher', () => {
      expect(alt.dispatcher.register.mock.calls.length).toBe(1);
    });

    it('inits with no playerName value', () => {
      const { playerName } = PlayerStore.getState();
      expect(playerName).toBe('');
    });

    it('inits with guessSubmitted as false', () => {
      const { guessSubmitted } = PlayerStore.getState();
      expect(guessSubmitted).toBe(false);
    });

    it('inits with aboutMe as false', () => {
      const { aboutMe } = PlayerStore.getState();
      expect(aboutMe).toBe(false);
    });
  });

  describe('#onSetPlayerName', () => {
    it('sets the playerName value', () => {
      callback(actionSetPlayerName);

      const { playerName } = PlayerStore.getState();
      expect(playerName).toBe(mockName);
    });
  });

  describe('#onSetAboutMe', () => {
    beforeEach(() => {
      callback(actionSetPlayerName);
    });

    it('sets aboutMe to true with a match', () => {
      callback(actionSetAboutMeTrue);

      const { aboutMe } = PlayerStore.getState();
      expect(aboutMe).toBe(true);
    });

    it('sets aboutMe to false without a match', () => {
      callback(actionSetAboutMeFalse);

      const { aboutMe } = PlayerStore.getState();
      expect(aboutMe).toBe(false);
    });

    it('resets guessSubmitted to false', () => {
      callback(actionSubmitVote);
      callback(actionSetAboutMeFalse);

      const { guessSubmitted } = PlayerStore.getState();
      expect(guessSubmitted).toBe(false);
    });
  });

  describe('#onSubmitVote', () => {
    it('sets guessSubmitted to true on vote submission', () => {
      callback(actionSubmitVote);

      const { guessSubmitted } = PlayerStore.getState();
      expect(guessSubmitted).toBe(true);
    })
  })

  describe('#onResetAndEnd', () => {
    it('resets the store', () => {
      callback(actionSetPlayerName);
      callback(actionSetAboutMeTrue);
      callback(actionSubmitVote);

      callback(actionReset);

      const {
        playerName,
        guessSubmitted,
        aboutMe
      } = PlayerStore.getState();

      expect(playerName).toBe('');
      expect(guessSubmitted).toBe(false);
      expect(aboutMe).toBe(false);
    });
  });
});
