import alt from '../alt';
import AppActions from '../actions/AppActions';

class AppStore {
  constructor() {
    this.bindActions(AppActions);

    this.conn = null;
    this.appState = 'setup';
    this.question = '';
    this.answers = [];
  }

  onConnection(conn) {
    this.conn = conn;
  }

  onSetAppState(state) {
    this.appState = state;
  }

  onSetCurrentQuestion(question) {
    this.question = question;
  }

  onSetCurrentAnswers(answers) {
    this.answers = answers;
  }

  onResetAndEnd() {
    this.conn = null;
    this.appState = 'setup';
    this.question = '';
    this.answers = [];
  }
}

export default alt.createStore(AppStore, 'AppStore');
