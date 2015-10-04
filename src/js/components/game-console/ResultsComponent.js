import React, { Component } from 'react';
import AppActions from '../../actions/AppActions';

export default class ResultsComponent extends Component {
  constructor(props) {
    super(props);

    const { conn } = this.props;
    setTimeout(() => AppActions.consoleReady(conn), 10000);
  }

  render() {
    const { question, guessResults, points } = this.props;

    console.log(guessResults);
    console.log(points);

    return (
      <div>
        <h2>{question}</h2>
        <p className='console-about'>The results...</p>
        <ul className='console-questions-list'>
          {
            guessResults.map((result, i) => {
              const { questionAbout } = this.props;
              return (
                <li key={i}>
                  <strong>Question</strong> - {result[1]}<br />
                  {result[0]}'s {result[3]}!<br />
                  <strong>Guessed By:</strong> - {
                    result[2].map((person, j) => <span key={j}>{person} </span>)
                  }<br />
                </li>
              );
            })
          }
        </ul>
        <br />
        <ul className='console-questions-list'>
          {
            points.map((p, i) => {
              return (
                <li><strong>{p[0]}</strong> - {p[1]}</li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}
