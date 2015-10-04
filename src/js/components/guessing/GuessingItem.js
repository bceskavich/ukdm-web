import React, { Component } from 'react';

export default class GuessingItem extends Component {
  render() {
    const { answer } = this.props;

    return (
      <li className='guessing-page-content__list'>
        <button
          className='guessing-page-content__button'
          onClick={this.submitAsChoice.bind(this)}
        >
          {answer[1]}
        </button>
      </li>
    );
  }

  submitAsChoice() {
    const { submitGuess, answer } = this.props;
    submitGuess(answer);
  }
}
