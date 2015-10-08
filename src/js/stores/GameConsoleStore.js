import alt from '../alt';
import ConsoleActions from '../actions/ConsoleActions';

class GameConsoleStore {
  constructor() {
    this.bindActions(ConsoleActions);

    this.players = [];
    this.questionAbout = '';
    this.submittedQuestions = [];
    this.submittedGuesses = [];
    this.guessResults = [];
    this.points = [];
  }

  onAddPlayer(player) {
    this.players.push(player);
  }

  onSetCurrentQuestion(questionAbout) {
    // Reset Answers Queue
    this.submittedQuestions = [];
    this.submittedGuesses = [];
    this.guessResults = [];
    this.points = [];

    // Set about
    this.questionAbout = questionAbout;
  }

  onPlayerSubmittedQuestion(player) {
    this.submittedQuestions.push(player)
  }

  onPlayerSubmittedGuess(player) {
    this.submittedGuesses.push(player);
  }

  onAddGuessResults(payload) {
    this.guessResults = payload.answers;
    this.points = payload.points;
  }

  onResetAndEnd() {
    this.players = [];
    this.questionAbout = '';
    this.submittedQuestions = [];
    this.submittedGuesses = [];
    this.guessResults = [];
    this.points = [];
  }
}

export default alt.createStore(GameConsoleStore, 'GameConsoleStore');
