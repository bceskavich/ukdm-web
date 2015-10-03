import React, { Component } from 'react';
import { Link } from 'react-router';

export default class HomePage extends Component {
  render() {
    return (
      <div className='home'>
        U Don't Know Me!

        <Link to='/player-signup'>Sign Up To Play</Link>
      </div>
    );
  }
}
