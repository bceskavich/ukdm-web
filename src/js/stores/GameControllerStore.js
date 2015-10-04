import alt from '../alt';
import AppActions from '../actions/AppActions';
import AppStore from './AppStore';

class GameControllerStore {
  constructor() {
    this.bindActions(AppActions);

    this.conn = null;

    this.appState = '';
    this.players = [];
    this.question = '';
    this.questionAbout = '';
    this.submittedQuestions = [];
    this.answers = [];
    this.submittedGuesses = [];
    this.guessResults = [];
    this.points = [];
  }

  onConnection(conn) {
    this.waitFor(AppStore.dispatchToken);
    this.conn = conn;
  }

  onSetAppState(state) {
    this.waitFor(AppStore.dispatchToken);
    this.appState = state;
  }

  onAddPlayer(player) {
    this.players.push(player);
  }

  onSetCurrentQuestion(payload) {
    this.waitFor(AppStore.dispatchToken);

    // Reset Answers Queue
    this.submittedQuestions = [];
    this.answers = [];
    this.submittedGuesses = [];
    this.guessResults = [];
    this.points = [];

    const { question, about } = payload;
    this.question = question;
    this.questionAbout = about;
  }

  onPlayerSubmittedQuestion(player) {
    this.submittedQuestions.push(player)
  }

  onSetCurrentAnswers(answers) {
    this.waitFor(AppStore.dispatchToken);
    this.answers = answers;
  }

  onPlayerSubmittedGuess(player) {
    this.submittedGuesses.push(player);
  }

  onAddGuessResults(payload) {
    this.guessResults = payload.answers;
    this.points = payload.points;
  }

  onResetAndEnd() {
    this.appState = '';
    this.players = [];
    this.question = '';
    this.questionAbout = '';
    this.submittedQuestions = [];
    this.answers = [];
    this.submittedGuesses = [];
    this.guessResults = [];
  }
}

export default alt.createStore(GameControllerStore, 'GameControllerStore');
