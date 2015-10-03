import alt from '../alt';
import AppActions from '../actions/AppActions';

class AppStore {
  constructor() {
    this.bindActions(AppActions);

    this.something = false;
  }

  onDoSomething(state) {
    this.something = state;
  }
}

export default alt.createStore(AppStore, 'AppStore');
