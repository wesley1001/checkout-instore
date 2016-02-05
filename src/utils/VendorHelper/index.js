import VendorActions from 'actions/VendorActions';
import VendorStore from 'stores/VendorStore';

function retriveCachedId() {
  let vendorData = window.localStorage.getItem('vendorData');

    if(vendorData) {
      vendorData = JSON.parse(vendorData);
      VendorActions.SetVendorDataSuccess(vendorData);
  }
}

class VendorHelper {
  isIdentified() {
    if(!VendorStore.getState().get('logged')) {
      retriveCachedId();
    }

    return VendorStore.getState().get('logged');
  }
}

export default new VendorHelper();
