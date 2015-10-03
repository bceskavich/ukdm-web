import React, { Component } from 'react';
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
    return (
      <div className='body'>
        {this.props.children}
      </div>
    );
  }
}
