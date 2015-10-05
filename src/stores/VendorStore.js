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

  onVtexIdAuthSuccess(data) {
    this.setState(this.state.set('vtexIdLogged', data.logged));
    this.setState(this.state.set('user', data.user));
    this.setState(this.state.set('store', data.store));
  }

  onVtexIdAuthFailed(error) {
    this.setState(this.state.set('vtexIdLogged', false));
    this.setState(this.state.set('user', undefined));
    this.setState(this.state.set('store', undefined));
  }

  onGetStoreInfoSuccess(data) {
    let store = Object.assign({}, this.state.get('store'), data);
    this.setState(this.state.set('store', store));
  }
}

export default flux.createStore(VendorStore, 'VendorStore');
