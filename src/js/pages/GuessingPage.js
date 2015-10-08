import React, { Component, PropTypes } from 'react';
import GuessingItem from '../components/guessing/GuessingItem';
import PlayerActions from '../actions/PlayerActions';

export default class GuessingPage extends Component {

  static propTypes = {
    aboutMe: PropTypes.bool,
    guessSubmitted: PropTypes.bool,
    playerName: PropTypes.string,
    conn: PropTypes.object
  }

  render() {
    const { aboutMe, guessSubmitted, playerName } = this.props;
    const answersForDisplay = answers.filter(answer => answer[0] !== playerName);

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
                  {answersForDisplay.map(answer => {
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
    const { playerName, conn } = this.props;
    PlayerActions.submitVote(playerName, answerForGuess[0], conn);
  }
}
