import React, { Component } from 'react';

export default class GuessesComponent extends Component {
  render() {
    const { question, answers, submittedGuesses, guessResults } = this.props;

    return (
      <div>
        <h2>{question}</h2>
        <p className='console-about'>The answers...</p>
        <ul className='console-questions-list'>
          {answers.map(answer => <li>{answer}</li>)}
        </ul>
        <br />
        <br />
        <ul className='console-questions-list'>
          {submittedGuesses.map(player => <li>{player} submited a guess.</li>)}
        </ul>
      </div>
    );
  }
}
