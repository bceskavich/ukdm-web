import alt from '../alt';
import { states, userTypes, messages } from '../constants/states';

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
    let conn = new WebSocket('ws://ec2-52-23-221-3.compute-1.amazonaws.com:80');

    conn.onmessage = (payload) => {
      const data = JSON.parse(payload.data);
      const { state, message } = data;
      const {
        setAppState,
        addPlayer,
        playerSubmittedQuestion,
        playerSubmittedGuess,
        addGuessResults
      } = this.actions;

      if (state === states.PENDING && message === messages.ADD_PLAYER) {
        addPlayer(data.name);
      }

      if (state === states.ANSWER && message === messages.ANSWER_SUBMITTED) {
        playerSubmittedQuestion(data.name);
      } else if (state === states.ANSWER) {
        const { question, about } = data;
        const { setCurrentQuestion } = this.actions;
        setCurrentQuestion({ question, about });
      }

      if (state === states.GUESSING && message === messages.GUESS_SUBMITTED) {
        playerSubmittedGuess(data.name);
        if (data.guesses_completed === true) {
          conn.send(JSON.stringify({ state: states.RESULTS }));
        }
      } else if (state === states.GUESSING) {
        const { answers } = data;
        const { setCurrentAnswers } = this.actions;
        setCurrentAnswers(answers);
      }

      if (state === states.RESULTS) {
        addGuessResults({ answers: data.answers, points: data.points });
      }

      setAppState(state);
    }

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
