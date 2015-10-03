import React from 'react';
import { Route, Router } from 'react-router';
import App from '../app';
import InGame from '../wrappers/InGame';
import HomePage from '../pages/HomePage';
import PlayerSignupPage from '../pages/PlayerSignupPage';
import LobbyPage from '../pages/LobbyPage';

const router = (
  <Router>
    <Route component={App}>
      <Route path='/' component={HomePage} />
      <Route path='/player-signup' component={PlayerSignupPage} />

      <Route component={InGame}>
        <Route path='/lobby' component={LobbyPage} />
      </Route>
    </Route>
  </Router>
);

export default router;
