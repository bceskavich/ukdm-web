import alt from '../alt';
import { states } from '../constants/states';

class AppActions {
  constructor() {
    this.generateActions(
      'setAppState',
      'setCurrentQuestion',
      'setCurrentAnswers',
      'resetAndEnd',
    );
  }

  connection() {
    let conn = new WebSocket('ws://10.10.11.61:9000');

    conn.onmessage = (payload) => {
      const data = JSON.parse(payload.data);
      const { state } = data;
      const { setAppState } = this.actions;

      if (state === states.ANSWER) {
        const { question, about } = data;
        const { setCurrentQuestion } = this.actions;
        setCurrentQuestion({ question, about });
      }

      if (state === states.GUESSING) {
        const { answers } = data;
        const { setCurrentAnswers } = this.actions;
        setCurrentAnswers(answers);
      }

      setAppState(state);
    }

    this.dispatch(conn);
  }

  setPlayerName(name, state, conn) {
    conn.send(JSON.stringify({state, name}));
    this.dispatch(name);
  }

  startGame(conn) {
    conn.send(JSON.stringify({state: 'start'}));
  }

  submitAnswer(name, answer, conn) {
    conn.send(JSON.stringify({
      name,
      answer,
      state: 'answer'
    }));
  }

  submitVote(name, playerVotedFor, conn) {
    conn.send(JSON.stringify({
      name,
      player_voted_for: playerVotedFor,
      state: 'guessing'
    }));

    this.dispatch(true);
  }
}

export default alt.createActions(AppActions);
