import React from 'react';
import { Route, Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import App from '../app';
import HomePage from '../pages/HomePage';

const router = (
  <Router history={new createBrowserHistory()}>
    <Route component={App}>
      <Route path='/' component={HomePage} />
    </Route>
  </Router>
);

export default router;
