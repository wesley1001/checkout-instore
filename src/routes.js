import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';

import VtexAuth from './pages/VtexAuth';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import PaymentPage from './pages/PaymentPage';

export default (
  <Route path='/' component={App}>
    <Route path='vtex/auth' component={VtexAuth} />
    <IndexRoute component={HomePage} />
    <Route path='shop' component={ShopPage} />
    <Route path='cart' component={CartPage} />
    <Route path='payment' component={PaymentPage} />
  </Route>
);
