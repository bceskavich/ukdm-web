import React, { Component, PropTypes } from 'react';
import PlayerActions from '../actions/PlayerActions';

export default class PlayerSignupPage extends Component {

  static propTypes = {
    // ReactRouter Props
    history: PropTypes.object,

    // AppStore Props
    conn: PropTypes.object,
    playerName: PropTypes.string,
    appState: PropTypes.string
  }

  constructor(props) {
    super(props);

    const { playerName, history } = this.props;
    if (playerName) {
      history.pushState(null, '/lobby');
    }

    this.state = {
      newPlayerName: ''
    };
  }

  componentDidUpdate() {
    const { playerName, history } = this.props;
    if (playerName) {
      history.pushState(null, '/lobby');
    }
  }

  render() {
    const { newPlayerName } = this.state;

    return (
      <div className='player-signup'>
        <div className='player-signup-content'>
          <h1>Pick Your Name</h1>
          <input
            className='player-signup-content__input'
            type='text'
            placeholder='Your name here...'
            value={newPlayerName}
            onChange={this.onNameInput.bind(this)}
          />
          <br />
          <button
            className='player-signup-content__button'
            onClick={this.submitPlayerName.bind(this)}>Submit</button>
        </div>
      </div>
    );
  }

  onNameInput(event) {
    this.setState({ newPlayerName: event.target.value });
  }

  submitPlayerName() {
    const { newPlayerName } = this.state;
    const { appState, conn } = this.props;
    this.setState({ newPlayerName: '' });
    PlayerActions.setPlayerName(newPlayerName, appState, conn);
  }
}
