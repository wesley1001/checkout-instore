import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import PaymentPage from './pages/PaymentPage';
import OrderPlaced from './pages/OrderPlaced';
import VendorLoginPage from './pages/VendorLoginPage';
import VendorLogoutPage from './pages/VendorLogoutPage';

import RouteHandler  from './routeHandler';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={HomePage} onEnter={RouteHandler}/>
    <Route path='shop' component={ShopPage} onEnter={RouteHandler}/>
    <Route path='cart' component={CartPage} onEnter={RouteHandler}/>
    <Route path='payment' component={PaymentPage} onEnter={RouteHandler}/>
    <Route path='orderplaced' component={OrderPlaced} onEnter={RouteHandler}/>

    <Route path='vendor/logout' component={VendorLogoutPage} />
    <Route path='vendor/login' component={VendorLoginPage} />
  </Route>
);
