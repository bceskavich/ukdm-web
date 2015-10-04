import React, { Component } from 'react';
import { states } from '../../constants/states';
import AppActions from '../../actions/AppActions';

export default class GameLobby extends Component {

  componentDidUpdate() {
    const { appState } = this.props;
    if (appState === states.START) {
      setTimeout(() => AppActions.setAppState(states.ANSWER), 3000);
    }
  }

  render() {
    const { players, appState } = this.props;

    return (
      <div className='console-lobby'>
        <h1>U Don't Know Me!</h1>

        <p>Players in the lobby:</p>
        <ul>
          {players.map(player => <li>{player}</li>)}
        </ul>

        {
          appState === states.START &&
            <div>
              <p>And we're ready to go!</p>
              <p>You're all horrible so this should be fun...</p>
            </div>
        }
        {
          appState !== states.START && !players.length ||
            <div>
              <p>Waiting on start...</p>
            </div>
        }
      </div>
    );
  }
}
