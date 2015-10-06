import React, { Component, PropTypes } from 'react';
import AppActions from '../actions/AppActions';

export default class QuestionPage extends Component {

  static propTypes = {
    question: PropTypes.string,
    aboutMe: PropTypes.bool,
    playerName: PropTypes.string,
    conn: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      answer: '',
      disabled: false
    };
  }

  render() {
    const { question, aboutMe } = this.props;
    const { answer, disabled } = this.state;

    return (
      <div className='question-page'>
        <div className='question-page-content'>
          <h1>{question}</h1>
          <br />
          <p>
            {
              aboutMe ?
                'This one\'s about you. Put something obvious for yourself!'
                :
                'What do you think your friend\'s answer will be?'
            }
          </p>
          <input
            disabled={disabled}
            className='question-page-content__input'
            type='text'
            value={answer}
            placeholder='Your answer here...'
            onChange={this.onAnswerInput.bind(this)}
          />
          <br />
          <button
            className='question-page-content__button'
            onClick={this.submitAnswer.bind(this)}
          >Submit Answer</button>
        </div>
      </div>
    );
  }

  onAnswerInput(event) {
    this.setState({ answer: event.target.value });
  }

  submitAnswer() {
    const { answer } = this.state;
    const { playerName, conn } = this.props;

    this.setState({ answer: '', disabled: true });
    AppActions.submitAnswer(playerName, answer, conn);
  }
}
