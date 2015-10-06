import React, { Component, PropTypes } from 'react';
import states from '../../constants/stateConstants';
import AppActions from '../../actions/AppActions';

export default class GameLobby extends Component {

  static propTypes = {
    appState: PropTypes.string,
    conn: PropTypes.object,
    players: PropTypes.array,
  }

  componentDidUpdate(prevProps) {
    const { appState, conn } = this.props;
    if (appState === states.START && prevProps.appState === states.PENDING) {
      setTimeout(() => AppActions.consoleReady(conn), 3000);
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
