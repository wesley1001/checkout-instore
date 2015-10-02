import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';

import VtexAuth from './pages/VtexAuth';
import Auth from './pages/Auth';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Payment from './pages/Payment';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Auth} />
    <Route path='vtex/auth' component={VtexAuth} />
    <Route path='shop' component={Shop} />
    <Route path='cart' component={Cart} />
    <Route path='payment' component={Payment} />
  </Route>
);
