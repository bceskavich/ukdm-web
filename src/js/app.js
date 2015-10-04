import React, { Component, PropTypes, cloneElement } from 'react';
import connectToStores from 'alt/utils/connectToStores';
import AppStore from './stores/AppStore';
import AppActions from './actions/AppActions';

@connectToStores
export default class App extends Component {

  static propTypes = {
    appState: PropTypes.string.isRequired,
    playerName: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    aboutMe: PropTypes.bool.isRequired
  }

  static getStores() {
    return [AppStore];
  }

  static getPropsFromStores() {
    return AppStore.getState();
  }

  constructor(props) {
    super(props);
    AppActions.connection();
  }

  // REMOVE - for testing
  componentDidUpdate() {
    const { appState } = this.props;
    console.log(appState);
  }

  render() {
    return (
      <div className='body'>
        {this.props.children && cloneElement(this.props.children, {...this.props})}
      </div>
    );
  }
}
