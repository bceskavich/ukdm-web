import alt from '../alt';
import states from '../constants/stateConstants';
import userTypes from '../constants/userTypeConstants';
import ServerConnection from '../utils/ServerConnection';

class ConsoleActions {
  constructor() {
    this.generateActions(
      'setCurrentQuestion',
      'resetAndEnd',
      'addPlayer',
      'playerSubmittedQuestion',
      'playerSubmittedGuess',
      'addGuessResults'
    );
  }

  connection(userType) {
    const conn = new ServerConnection('ws://ec2-52-23-221-3.compute-1.amazonaws.com:80');
    this.dispatch(conn);
  }

  setConsole(state, conn) {
    conn.send(JSON.stringify({
      state,
      user_type: userTypes.CONSOLE
    }));
  }

  consoleReady(conn) {
    conn.send(JSON.stringify({state: states.READY}));
  }
}

export default alt.createActions(ConsoleActions);
