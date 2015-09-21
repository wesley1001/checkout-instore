import React from 'react';
import {Router} from 'react-router';
// import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from './routes';

// let history = createBrowserHistory();

const container = document.getElementById('app-container');

React.render(<Router>{routes}</Router>, container);
// React.render(<Router history={history}>{routes}</Router>, container);
