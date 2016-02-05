import VendorStore from 'stores/VendorStore';
import CartStore from 'stores/CartStore';

class StoresUtil {
  getOrderForm() {
    return CartStore.getState('orderForm');
  }
  getVendor() {
    return VendorStore.getState('user');
  }
  getStore() {
    return VendorStore.getState('store');
  }
}

export default new StoresUtil();
