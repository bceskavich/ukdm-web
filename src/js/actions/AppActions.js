import alt from '../alt';
import ServerConnection from '../utils/ServerConnection';

class AppActions {
  constructor() {
    this.generateActions(
      'setAppState',
      'setCurrentQuestion',
      'setCurrentAnswers',
      'resetAndEnd'
    );
  }

  connection() {
    const conn = new ServerConnection('ws://ec2-52-23-221-3.compute-1.amazonaws.com:80');
    this.dispatch(conn);
  }
}

export default alt.createActions(AppActions);
