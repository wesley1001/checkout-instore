import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import OrderPlaced from './pages/OrderPlaced';
import VendorLoginPage from './pages/VendorLoginPage/VendorLoginPage';
import VendorLogoutPage from './pages/VendorLogoutPage';

import CartActions from 'actions/CartActions';
import CartStore from 'stores/CartStore';

import VendorHelper from './utils/VendorHelper';
import StoreHelper from './utils/StoreHelper';

function isIdentified(nextState, replaceState) {
  if (!VendorHelper.isIdentified() || !StoreHelper.isIdentified()) {
      replaceState({ nextPathname: nextState.location.pathname }, '/vendor/login')
  }
}
function getOrderForm() {
  const orderForm = CartStore.getState('orderForm').get('orderForm');
  if(!orderForm || !orderForm.orderFormId)
    CartActions.getOrderForm();
}
export default (
  <Route path='/' component={App}>
    <IndexRoute component={HomePage} onEnter={isIdentified, getOrderForm}/>
    <Route path='shop' component={ShopPage} onEnter={isIdentified, getOrderForm}/>
    <Route path='cart' component={CartPage} onEnter={isIdentified, getOrderForm}/>
    <Route path='orderplaced' component={OrderPlaced} onEnter={isIdentified}/>

    <Route path='vendor/logout' component={VendorLogoutPage} />
    <Route path='vendor/login' component={VendorLoginPage} />
  </Route>
);
