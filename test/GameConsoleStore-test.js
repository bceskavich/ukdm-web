jest.dontMock('../src/js/stores/GameConsoleStore');

describe('GameConsoleStore', () => {

  let ConsoleActions = require('../src/js/actions/ConsoleActions.js')
  let alt;
  let callback;
  let GameConsoleStore;

  beforeEach(() => {
    alt = require('../src/js/alt');
    alt.dispatcher = { register: jest.genMockFunction() };
    GameConsoleStore = require('../src/js/stores/GameConsoleStore');
    callback = alt.dispatcher.register.mock.calls[0][0];
  });

  const mockPlayer = 'dollabill$';
  const actionAddPlayer = {
    action: ConsoleActions.ADD_PLAYER,
    data: mockPlayer
  };

  const actionSetCurrentQuestion = {
    action: ConsoleActions.SET_CURRENT_QUESTION,
    data: mockPlayer
  };

  const actionPlayerSubmittedQuestion = {
    action: ConsoleActions.PLAYER_SUBMITTED_QUESTION,
    data: mockPlayer
  };

  const actionPlayerSubmittedGuess = {
    action: ConsoleActions.PLAYER_SUBMITTED_GUESS,
    data: mockPlayer
  };

  const mockGuessResults = {
    answers: ['One', 'Two', 'Three'],
    points: [1, 2, 3]
  };
  const actionAddGuessResults = {
    action: ConsoleActions.ADD_GUESS_RESULTS,
    data: mockGuessResults
  };

  const actionReset = {
    action: ConsoleActions.RESET_AND_END,
    data: null
  };

  // Initialization
  describe('#constructor', () => {
    it('registers a callback with the dispatcher', () => {
      expect(alt.dispatcher.register.mock.calls.length).toBe(1);
    });

    it('inits with an empty players array', () => {
      const { players } = GameConsoleStore.getState();
      expect(players).toEqual([]);
    });

    it('inits with an empty question about string', () => {
      const { questionAbout } = GameConsoleStore.getState();
      expect(questionAbout).toBe('');
    });

    it('inits with an empty submittedQuestions array', () => {
      const { submittedQuestions } = GameConsoleStore.getState();
      expect(submittedQuestions).toEqual([]);
    });

    it('inits with an empty submittedGuesses array', () => {
      const { submittedGuesses } = GameConsoleStore.getState();
      expect(submittedGuesses).toEqual([]);
    });

    it('inits with an empty guessResults array', () => {
      const { guessResults } = GameConsoleStore.getState();
      expect(guessResults).toEqual([]);
    });

    it('inits with an empty points array', () => {
      const { points } = GameConsoleStore.getState();
      expect(points).toEqual([]);
    });
  });

  describe('#onAddPlayer', () => {
    it('adds a player to the players array', () => {
      callback(actionAddPlayer);

      const { players } = GameConsoleStore.getState();
      expect(players).toEqual([mockPlayer]);
    });
  });

  describe('#onSetCurrentQuestion', () => {
    it('sets who the question is about', () => {
      callback(actionSetCurrentQuestion);

      const { questionAbout } = GameConsoleStore.getState();
      expect(questionAbout).toEqual(mockPlayer);
    });

    it('resets question and answers queue', () => {
      callback(actionPlayerSubmittedQuestion);
      callback(actionPlayerSubmittedGuess);
      callback(actionAddGuessResults);
      callback(actionSetCurrentQuestion);

      const {
        submittedQuestions,
        submittedGuesses,
        guessResults,
        points
      } = GameConsoleStore.getState();

      expect(submittedQuestions).toEqual([]);
      expect(submittedGuesses).toEqual([]);
      expect(guessResults).toEqual([]);
      expect(points).toEqual([]);
    });
  });

  describe('#onPlayerSubmittedQuestion', () => {
    it('adds a player to the submittedQuestions array', () => {
      callback(actionPlayerSubmittedQuestion);

      const { submittedQuestions } = GameConsoleStore.getState();
      expect(submittedQuestions).toEqual([mockPlayer]);
    });
  });

  describe('#onPlayerSubmittedGuess', () => {
    it('adds a player to the submittedGuesses array', () => {
      callback(actionPlayerSubmittedGuess);

      const { submittedGuesses } = GameConsoleStore.getState();
      expect(submittedGuesses).toEqual([mockPlayer]);
    });
  });

  describe('#onAddGuessResults', () => {
    beforeEach(() => {
      callback(actionAddGuessResults);
    });

    it('adds results to the guessResults array', () => {
      const { guessResults } = GameConsoleStore.getState();
      expect(guessResults).toEqual(mockGuessResults.answers);
    });

    it('adds points to the points array', () => {
      const { points } = GameConsoleStore.getState();
      expect(points).toEqual(mockGuessResults.points);
    });
  });

  describe('#onResetAndEnd', () => {
    it('resets the store', () => {
      callback(actionAddPlayer);
      callback(actionSetCurrentQuestion);
      callback(actionPlayerSubmittedQuestion);
      callback(actionPlayerSubmittedGuess);
      callback(actionAddGuessResults);

      callback(actionReset);

      const {
        players,
        questionAbout,
        submittedQuestions,
        submittedGuesses,
        guessResults,
        points
      } = GameConsoleStore.getState();

      expect(players).toEqual([]);
      expect(questionAbout).toBe('');
      expect(submittedQuestions).toEqual([]);
      expect(submittedGuesses).toEqual([]);
      expect(guessResults).toEqual([]);
      expect(points).toEqual([]);
    });
  });
});
