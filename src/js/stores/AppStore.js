import alt from '../alt';
import AppActions from '../actions/AppActions';

class AppStore {
  constructor() {
    this.bindActions(AppActions);

    this.playersList = [
      'jordan',
      'john'
    ];
  }
}

export default alt.createStore(AppStore, 'AppStore');
