import React, { Component, PropTypes } from 'react';
import ConsoleActions from '../../actions/ConsoleActions';

export default class ResultsComponent extends Component {

  static propTypes = {
    // GameControllerStore props
    conn: PropTypes.object,
    question: PropTypes.string,
    guessResults: PropTypes.array,
    points: PropTypes.array
  }

  constructor(props) {
    super(props);

    const { conn } = this.props;
    setTimeout(() => ConsoleActions.consoleReady(conn), 20000);
  }

  render() {
    const { question, guessResults, points } = this.props;

    return (
      <div>
        <h2>{question}</h2>
        <p className='console-about'>The results...</p>
        <ul className='console-questions-list'>
          {
            guessResults.map((result, i) => {
              const guessedBy = result[2].join(',');

              return (
                <li key={i}>
                  <em>Answer</em> - {result[1]}<br />
                  {result[0]}'s {result[3]}!<br />
                  <em>Guessed By:</em> - {guessedBy ? guessedBy : 'No One'}
                  <br />
                  <br />
                </li>
              );
            })
          }
        </ul>
        <br />
        <h3>Points</h3>
        <ul className='console-questions-list'>
          {
            points.map((p, i) => {
              return (
                <li><em>{p[0]}</em> - {p[1]}</li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}
