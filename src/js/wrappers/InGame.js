import React, { Component, PropTypes, cloneElement } from 'react';
import connectToStores from 'alt/utils/connectToStores';
import PlayerStore from '../stores/PlayerStore';

@connectToStores
export default class InGame extends Component {

  static propTypes = {
    // ReactRouter Props
    history: PropTypes.object.isRequired,

    // AppStore Props
    playersList: PropTypes.array.isRequired,

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
    this.transitionIfNotPlayer();
  }

  componentDidUpdate() {
    this.transitionIfNotPlayer();
  }

  render() {
    const { playerName, playersList } = this.props;

    return (
      <span>
        {this.props.children && cloneElement(this.props.children, {
          playerName,
          playersList
        })}
      </span>
    );
  }

  transitionIfNotPlayer() {
    const { playerName, history } = this.props;
    if (!playerName) {
      history.pushState(null, '/player-signup');
    }
  }
}
