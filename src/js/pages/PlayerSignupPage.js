import React, { Component, PropTypes } from 'react';
import connectToStores from 'alt/utils/connectToStores';
import PlayerStore from '../stores/PlayerStore';
import PlayerActions from '../actions/PlayerActions';

@connectToStores
export default class PlayerSignupPage extends Component {

  static propTypes = {
    // ReactRouter Props
    history: PropTypes.object.isRequired,

    // PlayerStore Props
    playerName: PropTypes.string.isRequired
  }

  static getStores() {
    return [PlayerStore];
  }

  static getPropsFromStores() {
    return PlayerStore.getState();
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
        Player Signup

        <input
          type='text'
          value={newPlayerName}
          onChange={this.onNameInput.bind(this)}
        />
        <button onClick={this.submitPlayerName.bind(this)}>Submit</button>
      </div>
    );
  }

  onNameInput(event) {
    this.setState({ newPlayerName: event.target.value });
  }

  submitPlayerName() {
    const { newPlayerName } = this.state;
    this.setState({ newPlayerName: '' });
    PlayerActions.setPlayerName(newPlayerName);
  }
}
