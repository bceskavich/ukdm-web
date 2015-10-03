import React, { Component, cloneElement } from 'react';
import connectToStores from 'alt/utils/connectToStores';
import AppStore from './stores/AppStore';

@connectToStores
export default class App extends Component {

  static getStores() {
    return [AppStore];
  }

  static getPropsFromStores() {
    return AppStore.getState();
  }

  render() {
    const { playersList } = this.props;

    return (
      <div className='body'>
        {this.props.children && cloneElement(this.props.children, {playersList})}
      </div>
    );
  }
}
