import flux from '../flux';
import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';

import VendorActions from 'actions/VendorActions';

@immutable
class VendorStore {
  constructor() {
    this.bindActions(VendorActions);

    this.state = Immutable.Map({
      vtexIdLogged: false,
      user: undefined,
      store: undefined,
      loading: false
    });
  }

  onCheckLogin() {
    this.setState(this.state.set('vtexIdLogged', false));
    this.setState(this.state.set('user', undefined));
    this.setState(this.state.set('store', undefined));
    this.setState(this.state.set('loading', true));
  }

  onVtexIdAuthSuccess(data) {
    this.setState(this.state.set('vtexIdLogged', data.logged));
    this.setState(this.state.set('user', data.user));
    this.setState(this.state.set('store', data.store));
    this.setState(this.state.set('loading', false));
  }

  onVtexIdAuthFailed(error) {
    this.setState(this.state.set('vtexIdLogged', false));
    this.setState(this.state.set('user', undefined));
    this.setState(this.state.set('store', undefined));
    this.setState(this.state.set('loading', false));
  }

  onGetStoreInfo() {
    this.setState(this.state.set('loading', true));
    this.setState(this.state.set('store', this.state.merge({tradePolicy: undefined})));
  }

  onGetStoreInfoSuccess(data) {
    this.setState(this.state.set('loading', false));
    this.setState(this.state.set('store', this.state.merge(data)));
  }

  onGetStoreInfoFail(err) {
    this.setState(this.state.set('loading', false));
    this.setState(this.state.set('store', this.state.merge({tradePolicy: undefined})));
  }
}

export default flux.createStore(VendorStore, 'VendorStore');
