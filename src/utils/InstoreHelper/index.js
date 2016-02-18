import VendorActions from 'actions/VendorActions';
import VendorStore from 'stores/VendorStore';

function retriveCachedData() {
  const user = JSON.parse(window.localStorage.getItem('user'));
  const store = JSON.parse(window.localStorage.getItem('store'));

  if(user && store) {
    VendorActions.SetInstoreDataSuccess.defer({user, store});
  }
  else {
    // VendorActions.SetInstoreDataFail.defer({message: 'localstore data not found'});
  }
}

class InstoreHelper {
  hasCredentials() {
    let store = VendorStore.getState('store').get('store');
    let user = VendorStore.getState('user').get('user');
    if(!(store && store.id) || !(user && user.id)) {
      retriveCachedData();
    }

    store = VendorStore.getState('store').get('store');
    user = VendorStore.getState('user').get('user');

    return (store && store.id !== undefined) && (user && user.id !== undefined);
  }
}

export default new InstoreHelper();
