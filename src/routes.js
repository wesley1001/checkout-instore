import React from 'react';
import { Route, DefaultRoute } from 'react-router';

import App from './components/App';

import Auth from './pages/Auth';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Payment from './pages/Payment';

export default (
  <Route name='home' path='/' handler={App}>
    <DefaultRoute name='instore_authentication' handler={Auth} />
    <Route name='instore_shop' path='/shop' handler={Shop}/>
    <Route name='cart' path='/cart' handler={Cart}/>
    <Route name='payment' path='/payment' handler={Payment}/>
  </Route>
);
