import React, { Component, PropTypes } from 'react';
import { states } from '../constants/states';
import GameLobby from '../components/game-console/GameLobby';
import SubmitQuestions from '../components/game-console/SubmitQuestions';
import GuessesComponent from '../components/game-console/GuessesComponent';

export default class GameConsolePage extends Component {

  static propTypes = {
    appState: PropTypes.string.isRequired,
    players: PropTypes.array.isRequired,
    question: PropTypes.string.isRequired,
    questionAbout: PropTypes.string.isRequired,
    submittedQuestions: PropTypes.array.isRequired,
    answers: PropTypes.array.isRequired,
    submittedGuesses: PropTypes.array.isRequired,
    guessResults: PropTypes.array.isRequired
  }

  render() {
    const { appState } = this.props;

    if (appState === states.SETUP || appState === states.PENDING || appState === states.START) {
      return this.renderLobby();
    } else if (appState === states.ANSWER) {
      return this.renderQuestion();
    } else if (appState === states.GUESSING) {
      return this.renderGuessing();
    }
  }

  renderLobby() {
    const { players, appState } = this.props;
    return (
      <div className='game-console-page'>
        <div className='game-console-page-content'>
        <GameLobby
          appState={appState}
          players={players}
        />
        </div>
      </div>
    );
  }

  renderQuestion() {
    const { question, questionAbout, submittedQuestions } = this.props;
    return (
      <div className='game-console-page'>
        <div className='game-console-page-content'>
        <SubmitQuestions
          question={question}
          about={questionAbout}
          submittedQuestions={submittedQuestions}
        />
        </div>
      </div>
    );
  }

  renderGuessing() {
    const { question, answers, submittedGuesses, guessResults } = this.props;
    return (
      <div className='game-console-page'>
        <div className='game-console-page-content'>
        <GuessesComponent
          question={question}
          answers={answers}
          submittedGuesses={submittedGuesses}
          guessResults={guessResults}
        />
        </div>
      </div>
    );
  }
}
