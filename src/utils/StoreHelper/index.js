import VendorActions from 'actions/VendorActions';
import VendorStore from 'stores/VendorStore';

function retriveCachedId() {
  let data = window.localStorage.getItem('storeData');

  if(data) {
    data = JSON.parse(data);
    VendorActions.GetStoreInfoSuccess(data);
  }
}

class StoreHelper {
  isIdentified() {
    if(!VendorStore.getState('store').get('store')) {
      retriveCachedId();
    }
    return VendorStore.getState('store').get('store');
  }
}

export default new StoreHelper();
