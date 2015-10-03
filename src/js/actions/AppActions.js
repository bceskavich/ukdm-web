import alt from '../alt';

class AppActions {
  constructor() {
    this.generateActions('doSomething');
  }
}

export default alt.createActions(AppActions);
