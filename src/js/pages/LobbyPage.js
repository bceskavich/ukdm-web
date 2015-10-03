import React, { Component, PropTypes } from 'react';
import connectToStores from 'alt/utils/connectToStores';

export default class LobbyPage extends Component {

  static propTypes = {
    // AppStore Props
    playersList: PropTypes.array.isRequired,

    // PlayerStore Props
    playerName: PropTypes.string.isRequired
  }

  render() {
    const { playersList, playerName } = this.props;

    return (
      <div className='lobby'>
        <h1>Welcome, {playerName}!</h1>

        <strong>Current Players</strong>
        <ul>{playersList.map(player => <li>{player}</li>)}</ul>
      </div>
    );
  }
}
