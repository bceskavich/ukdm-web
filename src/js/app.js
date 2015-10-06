import React, { Component, PropTypes } from 'react';
import merge from 'lodash/object/merge';
import connectToStores from 'alt/utils/connectToStores';
import renderRouteChildren from './utils/renderRouteChildren';
import AppStore from './stores/AppStore';
import GameControllerStore from './stores/GameControllerStore';
import AppActions from './actions/AppActions';

@connectToStores
export default class App extends Component {

  static propTypes = {
    // AppStore props
    conn: PropTypes.object.isRequired,
    appState: PropTypes.object.isRequired,
    playerName: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    answers: PropTypes.array.isRequired,
    guessSubmitted: PropTypes.bool.isRequired,
    aboutMe: PropTypes.bool.isRequired,

    // GameControllerStore Props
    players: PropTypes.array.isRequired,
    questionAbout: PropTypes.string.isRequired,
    submittedQuestions: PropTypes.array.isRequired,
    submittedGuesses: PropTypes.array.isRequired,
    guessResults: PropTypes.array.isRequired,
    points: PropTypes.array.isRequired
  }

  static getStores() {
    return [AppStore, GameControllerStore];
  }

  static getPropsFromStores() {
    const {
      players,
      questionAbout,
      submittedQuestions,
      submittedGuesses,
      guessResults,
      points
    } = GameControllerStore.getState();

    return merge(AppStore.getState(), {
      players,
      questionAbout,
      submittedQuestions,
      submittedGuesses,
      guessResults,
      points
    });
  }

  constructor(props) {
    super(props);
    AppActions.connection();
  }

  render() {
    return (
      <div className='body'>
        {renderRouteChildren(this.props)}
      </div>
    );
  }
}
