import React from 'react';
import { Route, Router, IndexRoute } from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import App from '../app';
import InGame from '../wrappers/InGame';
import HomePage from '../pages/HomePage';
import PlayerSignupPage from '../pages/PlayerSignupPage';
import LobbyPage from '../pages/LobbyPage';
import QuestionPage from '../pages/QuestionPage';
import GuessingPage from '../pages/GuessingPage';
import GameConsolePage from '../pages/GameConsolePage';

let history = createHashHistory();
if (DEPLOY !== 'static') {
  history = createBrowserHistory();
}

const router = (
  <Router history={history}>
    <Route path='/' component={App}>
      <IndexRoute component={HomePage} />
      <Route path='/game-console' component={GameConsolePage} />
      <Route path='/player-signup' component={PlayerSignupPage} />

      <Route component={InGame}>
        <Route path='/lobby' component={LobbyPage} />
        <Route path='/question' component={QuestionPage} />
        <Route path='/guessing' component={GuessingPage} />
      </Route>
    </Route>
  </Router>
);

export default router;
