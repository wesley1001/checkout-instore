import flux from '../flux';
import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';

import VtexActions from 'actions/VtexActions';

@immutable
class VendorStore {
  constructor() {
    this.bindActions(VtexActions);

    this.state = Immutable.Map({
      vtexIdLogged: false,
      user: undefined,
      store: undefined
    });
  }

  onVtexIdAuthRefreshed(data) {
    this.setState(this.state.set('vtexIdLogged', true));
  }
  onVtexIdAuthSuccess(data) {
    this.setState(this.state.set('vtexIdLogged', true));
    this.setState(this.state.set('vendorId', undefined));
  }
  onVtexIdAuthFailed(error) {
    this.setState(this.state.set('vtexIdLogged', false));
    this.setState(this.state.set('vendorId', undefined));
  }
  onGetStoreInfoSuccess(data) {
    let store = Object.assign({}, this.state.get('store'), data);
    this.setState(this.state.set('store', store));
  }
  onGetStoreInfoFail(error) {
  }
}

export default flux.createStore(VendorStore, 'VendorStore');
