import alt from '../alt';
import states from '../constants/stateConstants';
import userTypes from '../constants/userTypeConstants';

class PlayerActions {
  constructor() {
    this.generateActions(
      'setAboutMe',
      'resetAndEnd'
    );
  }

  startGame(conn) {
    conn.send(JSON.stringify({state: states.START}));
  }

  setPlayerName(name, state, conn) {
    conn.send(JSON.stringify({
      state,
      name,
      user_type: userTypes.USER
    }));
    this.dispatch(name);
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

export default alt.createActions(PlayerActions);
