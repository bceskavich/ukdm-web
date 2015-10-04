import React, { Component, PropTypes } from 'react';
import GuessingItem from '../components/guessing/GuessingItem';
import AppActions from '../actions/AppActions';

export default class GuessingPage extends Component {
  render() {
    const { answers, aboutMe, guessSubmitted } = this.props;

    return (
      <div className='guessing-page'>
        <div className='guessing-page-content'>
          {
            aboutMe &&
              <p>This one's about you. Hang tight while people vote.</p>
          }
          {
            !aboutMe && !guessSubmitted &&
              <div>
                <h2>The Answers</h2>
                <ul>
                  {answers.map(answer => {
                    return (
                      <GuessingItem
                        answer={answer}
                        submitGuess={this.submitGuess.bind(this)}
                      />
                    );
                  })}
                </ul>
              </div>
          }
          {
            !aboutMe && guessSubmitted &&
              <p>Thanks. Hang tight while everyone else submits their answers.</p>
          }
        </div>
      </div>
    );
  }

  submitGuess(answerForGuess) {
    const { playerName, answer, conn } = this.props;
    AppActions.submitVote(playerName, answerForGuess[0], conn);
  }
}
