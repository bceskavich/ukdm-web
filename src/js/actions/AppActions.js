import alt from '../alt';
import states from '../constants/stateConstants';
import userTypes from '../constants/userTypeConstants';
import ServerConnection from '../utils/ServerConnection';

class AppActions {
  constructor() {
    this.generateActions(
      'setAppState',
      'setCurrentQuestion',
      'setCurrentAnswers',
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

  setPlayerName(name, state, conn) {
    conn.send(JSON.stringify({
      state,
      name,
      user_type: userTypes.USER
    }));
    this.dispatch(name);
  }

  setConsole(state, conn) {
    conn.send(JSON.stringify({
      state,
      user_type: userTypes.CONSOLE
    }));
  }

  startGame(conn) {
    conn.send(JSON.stringify({state: states.START}));
  }

  consoleReady(conn) {
    conn.send(JSON.stringify({state: states.READY}));
  }

  submitAnswer(name, answer, conn) {
    conn.send(JSON.stringify({
      name,
      answer,
      state: states.ANSWER
    }));
  }

  submitVote(name, playerVotedFor, conn) {
    conn.send(JSON.stringify({
      name,
      player_voted_for: playerVotedFor,
      state: states.GUESSING
    }));

    this.dispatch(true);
  }
}

export default alt.createActions(AppActions);
