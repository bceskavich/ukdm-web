import alt from '../alt';

class PlayerActions {
  constructor() {
    this.generateActions('setPlayerName');
  }
}

export default alt.createActions(PlayerActions);
