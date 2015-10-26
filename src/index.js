import 'utils/WebViewBridge';

import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
// import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from './routes';

// let history = createBrowserHistory();

const container = document.getElementById('app-container');

render(<Router>{routes}</Router>, container);
// React.render(<Router history={history}>{routes}</Router>, container);
