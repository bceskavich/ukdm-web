import React, { Component } from 'react';

export default class GuessesComponent extends Component {
  render() {
    const { question, answers, submittedGuesses, guessResults } = this.props;

    return (
      <div>
        <h2>{question}</h2>
        <p>The answers...</p>
        <ul>
          {answers.map(answer => <li>{answer}</li>)}
        </ul>
        <hr />
        <ul>
          {submittedGuesses.map(player => <li>{player} submited a guess.</li>)}
        </ul>
      </div>
    );
  }
}
