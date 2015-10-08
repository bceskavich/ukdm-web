import React, { Component, PropTypes } from 'react';
import PlayerActions from '../actions/PlayerActions';

export default class LobbyPage extends Component {

  static propTypes = {
    // AppStore Props
    conn: PropTypes.object,
    playerName: PropTypes.string.isRequired
  }

  render() {
    const { playerName } = this.props;

    return (
      <div className='lobby'>
        <div className='lobby-content'>
          <h1>Welcome, {playerName}!</h1>
          <div className='lobby-content-list'>
            <p>Waiting on a few more to join...</p>
          </div>

          <button
            className='lobby-button'
            onClick={this.startGame.bind(this)}
          >Start Game</button>
        </div>
      </div>
    );
  }

  startGame() {
    const { conn } = this.props;
    PlayerActions.startGame(conn);
  }
}
