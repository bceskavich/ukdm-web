import alt from '../alt';
import AppActions from '../actions/AppActions';

class AppStore {
  constructor() {
    this.bindActions(AppActions);

    this.conn = null;

    this.appState = '';
    this.playerName = '';
    this.question = '';
    this.answers = [];
    this.guessSubmitted = false;
    this.aboutMe = false;
  }

  onConnection(conn) {
    this.conn = conn;
  }

  onSetAppState(state) {
    this.appState = state;
  }

  onSetPlayerName(name) {
    this.playerName = name;
  }

  onSetCurrentQuestion(payload) {
    this.question = payload.question;
    this.guessSubmitted = false;
    if (payload.about === this.playerName) {
      this.aboutMe = true;
    } else {
      this.aboutMe = false;
    }
  }

  onSetCurrentAnswers(answers) {
    this.answers = answers;
  }

  onSubmitVote() {
    this.guessSubmitted = true;
  }

  onResetAndEnd() {
    this.appState = '';
    this.playerName = '';
    this.question = '';
    this.answers = [];
    this.guessSubmitted = false;
    this.aboutMe = false;
  }
}

export default alt.createStore(AppStore, 'AppStore');
