import React, { Component } from 'react';
import { states } from '../../constants/states';
import AppActions from '../../actions/AppActions';

export default class GameLobby extends Component {

  componentDidUpdate() {
    const { appState } = this.props;
    if (appState === states.START) {
      setTimeout(() => AppActions.setAppState(states.ANSWER), 5000);
    }
  }

  render() {
    const { players, appState } = this.props;

    return (
      <div>
        <h1>U Don't Know Me!</h1>

        <p><strong>Players in the lobby...</strong></p>
        <ul>
          {players.map(player => <li>{player}</li>)}
        </ul>

        {
          appState === states.START &&
            <p>Well, it looks like we're ready to start. You're all horrible so
            this should be fun...</p>
        }
      </div>
    );
  }
}
