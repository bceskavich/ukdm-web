import states from '../constants/stateConstants';
import messages from '../constants/messagesConstants';
import AppActions from '../actions/AppActions';
import PlayerActions from '../actions/PlayerActions';
import ConsoleActions from '../actions/ConsoleActions';

export default class ServerConnection extends Object {

  constructor(uri) {
    super();

    this.socket = new WebSocket(uri);

    this.socket.onmessage = (payload) => {
      const data = JSON.parse(payload.data);
      const { state } = data;

      switch (state) {
        case states.PENDING:
          this.handlePending(data);
          break;
        case states.ANSWER:
          this.handleAnswering(data);
          break;
        case states.GUESSING:
          this.handleGuessing(data);
          break;
        case states.RESULTS:
          this.handleResults(data);
          break;
      }

      AppActions.setAppState(state);
    }
  }

  send(payload) {
    this.socket.send(payload);
  }

  handlePending(data) {
    const { message } = data;
    if (message === messages.ADD_PLAYER) {
      ConsoleActions.addPlayer(data.name);
    }
  }

  handleAnswering(data) {
    const { message } = data;

    if (message === messages.ANSWER_SUBMITTED) {
      ConsoleActions.playerSubmittedQuestion(data.name);
    } else {
      const { question, about } = data;

      // TODO - clean this up!
      AppActions.setCurrentQuestion(question);
      ConsoleActions.setCurrentQuestion(about);
      PlayerActions.setAboutMe(about);
    }
  }

  handleGuessing(data) {
    const { message } = data;

    if (message === messages.GUESS_SUBMITTED) {
      ConsoleActions.playerSubmittedGuess(data.name);

      if (data.guesses_completed) {
        this.send(JSON.stringify({ state: states.RESULT }));
      }
    } else {
      const { answers } = data;
      AppActions.setCurrentAnswers(answers);
    }
  }

  handleResults(data) {
    const { answers, points } = data;
    ConsoleActions.addGuessResults({ answers, points });
  }
}
