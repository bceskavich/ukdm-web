import React, { Component } from 'react';

export default class SubmitQuestions extends Component {
  render() {
    const { question, about, submittedQuestions } = this.props;

    return (
      <div>
        <h2>{question}</h2>
        <p>This one's about {about}.</p>
        <ul>
          {submittedQuestions.map(player => {
            return <li>{player} submitted an answer.</li>;
          })}
        </ul>
      </div>
    );
  }
}
