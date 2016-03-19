import flux from './flux.js'

import CartActions from 'actions/CartActions';
import CartStore from 'stores/CartStore';
import CheckoutStore from 'stores/CheckoutStore';

import InstoreHelper from 'utils/InstoreHelper';
import CookieHelper from 'utils/CookieHelper';

function hasCredentials(nextState, replaceState) {
  if (!InstoreHelper.hasCredentials()) {
      replaceState({ nextPathname: nextState.location.pathname }, '/vendor/login')
      return false;
  }
  return true;
}

function clearOrderFormCookie() {
  CookieHelper.removeCheckoutCookie();

  return true;
}

function clearCartStore(){
  flux.recycle(CartStore);
  return true;
}

function clearCheckoutStore(){
  flux.recycle(CheckoutStore);
  return true;
}

function getOrderForm() {
  const orderForm = CartStore.getState('orderForm').get('orderForm');

  if(!orderForm || !orderForm.orderFormId)
    CartActions.getOrderForm.defer();

  return true;
}

const pageHandlers = {
  '/': [hasCredentials, clearCartStore, clearCheckoutStore, clearOrderFormCookie, getOrderForm],
  '/shop': [hasCredentials, getOrderForm],
  '/cart': [hasCredentials, getOrderForm],
  '/payment': [hasCredentials, getOrderForm],
  '/orderplaced': [hasCredentials]
}

export default function handler(nextState, replaceState) {
  const path = nextState.location.pathname;
  if(pageHandlers[path] !== undefined) {
    pageHandlers[path].every((fn) =>  {
      return fn(nextState, replaceState);
    });
  }
}
