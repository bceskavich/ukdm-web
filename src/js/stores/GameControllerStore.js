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
  }

  onConnection(conn) {
    this.waitFor(AppStore.dispatchToken);
    this.conn = conn;
  }

  onSetAppState(state) {
    this.waitFor(AppStore.dispatchToken);
    this.appState = state;
  }

  // TODO in AppActions
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

    const { question, about } = payload;
    this.question = question;
    this.questionAbout = about;
  }

  // TODO in AppActions
  onPlayerSubmittedQuestion(player) {
    this.submittedQuestions.push(player)
  }

  onSetCurrentAnswers(answers) {
    this.waitFor(AppStore.dispatchToken);
    this.answers = answers;
  }

  // TODO in AppActions
  onPlayerSubmitttedGuess(player) {
    This.submittedGuesses.push(player);
  }

  // TODO in AppActions
  onAddGuessResult(result) {
    this.guessResults.push(result);
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
