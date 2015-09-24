import flux from '../flux';
import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';

import VendorActions from 'actions/VendorActions';
import VtexActions from 'actions/VtexActions';

@immutable
class VendorStore {
  constructor() {
    this.bindActions(VendorActions);
    this.bindActions(VtexActions);

    this.state = Immutable.Map({
      vtexIdLogged: false,
      vendorId: undefined
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
  onVendorLoginSuccess(data) {
    this.setState(this.state.set('vendorId', data));
  }
  onVendorLoginFailed(error) {
    this.setState(this.state.set('vendorId', undefined));
  }
}

export default flux.createStore(VendorStore, 'VendorStore');
