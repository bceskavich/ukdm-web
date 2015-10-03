import alt from '../alt';
import PlayerActions from '../actions/PlayerActions';

class PlayerStore {
  constructor() {
    this.bindActions(PlayerActions);

    this.playerName = '';
  }

  onSetPlayerName(name) {
    this.playerName = name;
  }
}

export default alt.createStore(PlayerStore, 'PlayerStore');
