import React, { Component, PropTypes } from 'react';

export default class SubmitQuestions extends Component {

  static propTypes = {
    question: PropTypes.string,
    about: PropTypes.string,
    submittedQuestions: PropTypes.array
  }

  render() {
    const { question, about, submittedQuestions } = this.props;

    return (
      <div>
        <h2>{question}</h2>
        <p className='console-about'>This one's about {about}.</p>
        <br />
        <ul className='console-questions-list'>
          {submittedQuestions.map(player => {
            return <li>{player} submitted an answer.</li>;
          })}
        </ul>
      </div>
    );
  }
}
