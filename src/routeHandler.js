import CartActions from 'actions/CartActions';
import CartStore from 'stores/CartStore';
import InstoreHelper from 'utils/InstoreHelper';
import CookieHelper from 'utils/CookieHelper';

function hasCredentials(nextState, replaceState) {
  console.log('hasCredentials ', InstoreHelper.hasCredentials());

  if (!InstoreHelper.hasCredentials()) {
      console.log('x');
      replaceState({ nextPathname: nextState.location.pathname }, '/vendor/login')
      return false;
  }
  return true;
}

function clearOrderFormCookie() {
  console.log(2);
  CookieHelper.removeCheckoutCookie();

  return true;
}

function getOrderForm() {
  console.log(3);
  const orderForm = CartStore.getState('orderForm').get('orderForm');
  if(!orderForm || !orderForm.orderFormId)
    CartActions.getOrderForm.defer();

  return true;
}

const pageHandlers = {
  '/': [hasCredentials, clearOrderFormCookie, getOrderForm],
  'shop': [hasCredentials, clearOrderFormCookie, getOrderForm],
  'cart': [hasCredentials, getOrderForm],
  'orderplaced': [hasCredentials]
}

export default function handler(nextState, replaceState) {
  const path = nextState.location.pathname;
  if(pageHandlers[path] !== undefined) {
    pageHandlers[path].every((fn) =>  {
      console.log(fn, 'a');
      return fn(nextState, replaceState);
    });
  }
}
