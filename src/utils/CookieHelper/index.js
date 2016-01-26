import cookie from 'react-cookie';

const CHECKOUT_COOKIE_KEY = 'checkout.vtex.com';
const ORDER_FORM_ID_KEY = '__ofid';

class CookieHelper {
    getOrderFormId(){
      let checkoutCookieValue = cookie.load(CHECKOUT_COOKIE_KEY);
      let parsedValue = checkoutCookieValue.split('=');
      let orderFormId = null;

      if(parsedValue[0] == ORDER_FORM_ID_KEY && parsedValue.length == 2){
        orderFormId = parsedValue[1];
      }

      return orderFormId;
    }
}

export default new CookieHelper();
