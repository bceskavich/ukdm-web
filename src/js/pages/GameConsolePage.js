import React, { Component, PropTypes } from 'react';
import states from '../constants/stateConstants';
import ConsoleActions from '../actions/ConsoleActions';
import GameLobby from '../components/game-console/GameLobby';
import SubmitQuestions from '../components/game-console/SubmitQuestions';
import GuessesComponent from '../components/game-console/GuessesComponent';
import ResultsComponent from '../components/game-console/ResultsComponent';

export default class GameConsolePage extends Component {

  static propTypes = {
    appState: PropTypes.string,
    players: PropTypes.array,
    question: PropTypes.string,
    questionAbout: PropTypes.string,
    submittedQuestions: PropTypes.array,
    answers: PropTypes.array,
    submittedGuesses: PropTypes.array,
    guessResults: PropTypes.array,
    points: PropTypes.array
  }

  constructor(props) {
    super(props);

    const { appState, conn } = this.props;
    ConsoleActions.setConsole(appState, conn);
  }

  render() {
    const { appState } = this.props;

    if (appState === states.SETUP || appState === states.PENDING || appState === states.START) {
      return this.renderLobby();
    } else if (appState === states.ANSWER) {
      return this.renderQuestion();
    } else if (appState === states.GUESSING) {
      return this.renderGuessing();
    } else if (appState === states.RESULTS) {
      return this.renderResults();
    }
  }

  renderLobby() {
    const { players, appState, conn } = this.props;
    return (
      <div className='game-console-page'>
        <div className='game-console-page-content'>
        <GameLobby
          conn={conn}
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
    const { question, answers, submittedGuesses } = this.props;
    return (
      <div className='game-console-page'>
        <div className='game-console-page-content'>
        <GuessesComponent
          question={question}
          answers={answers}
          submittedGuesses={submittedGuesses}
        />
        </div>
      </div>
    );
  }

  renderResults() {
    const { question, guessResults, points, conn, questionAbout } = this.props;
    return (
      <div className='game-console-page'>
        <div className='game-console-page-content'>
        <ResultsComponent
          conn={conn}
          question={question}
          guessResults={guessResults}
          points={points}
          questionAbout={questionAbout}
        />
        </div>
      </div>
    );
  }
}
