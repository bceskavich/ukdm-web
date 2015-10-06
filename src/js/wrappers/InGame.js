import React, { Component, PropTypes } from 'react';
import states from '../constants/stateConstants';
import renderRouteChildren from '../utils/renderRouteChildren';

export default class InGame extends Component {

  static propTypes = {
    // ReactRouter Props
    history: PropTypes.object,
    location: PropTypes.object,

    // AppStore Props
    conn: PropTypes.object,

    // PlayerStore Props
    appState: PropTypes.string,
    playerName: PropTypes.string,
    question: PropTypes.string,
    aboutMe: PropTypes.bool,
    answers: PropTypes.array,
    guessSubmitted: PropTypes.bool,
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
    return (
      <span>
        {renderRouteChildren(this.props)}
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
    } else if ((appState === states.GUESSING || appState === states.RESULTS) && location.pathname !== '/guessing') {
      history.pushState(null, '/guessing');
    } else if (appState === states.END) {
      AppActions.resetAndEnd();
    }
  }
}
