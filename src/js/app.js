import React, { Component, PropTypes, cloneElement } from 'react';
import merge from 'lodash.merge';
import connectToStores from 'alt/utils/connectToStores';
import AppStore from './stores/AppStore';
import GameControllerStore from './stores/GameControllerStore';
import AppActions from './actions/AppActions';

@connectToStores
export default class App extends Component {

  static getStores() {
    return [AppStore, GameControllerStore];
  }

  static getPropsFromStores() {
    const {
      players,
      questionAbout,
      submittedQuestions,
      submittedGuesses,
      guessResults
    } = GameControllerStore.getState();

    return merge(AppStore.getState(), {
      players,
      questionAbout,
      submittedQuestions,
      submittedGuesses,
      guessResults
    });
  }

  constructor(props) {
    super(props);
    AppActions.connection();
  }

  render() {
    return (
      <div className='body'>
        {this.props.children && cloneElement(this.props.children, {...this.props})}
      </div>
    );
  }
}
