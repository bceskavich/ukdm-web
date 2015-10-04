import React, { Component, PropTypes, cloneElement } from 'react';
import { states } from '../constants/states';

export default class InGame extends Component {

  static propTypes = {
    // ReactRouter Props
    history: PropTypes.object.isRequired,

    // PlayerStore Props
    appState: PropTypes.string.isRequired,
    playerName: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    aboutMe: PropTypes.bool.isRequired,
    answers: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
    this.transitionIfNotPlayer();
    this.transitionIfStateChange();
  }

  componentDidUpdate() {
    this.transitionIfNotPlayer();
    this.transitionIfStateChange();
  }

  render() {
    const {
      appState,
      playerName,
      question,
      answers,
      aboutMe,
      guessSubmitted,
      conn
    } = this.props;

    return (
      <span>
        {this.props.children && cloneElement(this.props.children, {
          appState,
          playerName,
          question,
          answers,
          aboutMe,
          guessSubmitted,
          conn
        })}
      </span>
    );
  }

  transitionIfNotPlayer() {
    const { playerName, history } = this.props;
    if (!playerName) {
      history.pushState(null, '/');
    }
  }

  transitionIfStateChange() {
    const { appState, history, location } = this.props;
    if ((appState === states.START || appState === states.ANSWER) && location.pathname !== '/question') {
      history.pushState(null, '/question');
    } else if (appState === states.GUESSING && location.pathname !== '/guessing') {
      history.pushState(null, '/guessing');
    } else if (appState === states.END) {
      AppActions.resetAndEnd();
    }
  }
}
