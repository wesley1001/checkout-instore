import cookie from 'react-cookie';

const CHECKOUT_COOKIE_KEY = 'checkout.vtex.com';
const CHECKOUT_COOKIE_PATH = '/';
const CHECKOUT_COOKIE_DOMAIN = window.location.hostname;
const ORDER_FORM_ID_KEY = '__ofid';

class CookieHelper {
    getOrderFormId(){
      let checkoutCookieValue = cookie.load(CHECKOUT_COOKIE_KEY);
      let orderFormId = null;

      if(checkoutCookieValue){
        let parsedValue = checkoutCookieValue.split('=');

        if(parsedValue[0] == ORDER_FORM_ID_KEY && parsedValue.length == 2){
          orderFormId = parsedValue[1];
        }
      }

      return orderFormId;
    }

    removeCheckoutCookie(){
      cookie.remove(CHECKOUT_COOKIE_KEY, {
        path: CHECKOUT_COOKIE_PATH,
        domain: CHECKOUT_COOKIE_DOMAIN
      });
    }
}

export default new CookieHelper();
