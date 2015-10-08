import alt from '../alt';
import PlayerActions from '../actions/PlayerActions';

class PlayerStore {
  constructor() {
    this.bindActions(PlayerActions);

    this.playerName = '';
    this.guessSubmitted = false;
    this.aboutMe = false;
  }

  onSetPlayerName(name) {
    this.playerName = name;
  }

  onSetAboutMe(about) {
    this.guessSubmitted = false;
    if (about === this.playerName) {
      this.aboutMe = true;
    } else {
      this.aboutMe = false;
    }
  }

  onSubmitVote() {
    this.guessSubmitted = true;
  }

  onResetAndEnd() {
    this.playerName = '';
    this.guessSubmitted = false;
    this.aboutMe = false;
  }
}

export default alt.createStore(PlayerStore, 'PlayerStore');
