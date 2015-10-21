import flux from '../flux';
import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';

import VendorActions from 'actions/VendorActions';

@immutable
class VendorStore {
  constructor() {
    this.bindActions(VendorActions);

    this.state = Immutable.Map({
      logged: false,
      user: undefined,
      store: undefined,
      loading: false,
      error: undefined
    });
  }

  onCheckLogin() {
    this.setState(this.state.set('logged', false));
    this.setState(this.state.set('user', undefined));
    this.setState(this.state.set('store', undefined));
    this.setState(this.state.set('loading', true));
    this.setState(this.state.set('error', undefined));
  }

  onVtexIdAuthSuccess(data) {
    this.setState(this.state.set('logged', data.logged));
    this.setState(this.state.set('user', data.user));
    this.setState(this.state.set('store', data.store));
    this.setState(this.state.set('loading', false));
  }

  onVtexIdAuthFailed(error) {
    this.setState(this.state.set('logged', false));
    this.setState(this.state.set('user', undefined));
    this.setState(this.state.set('store', undefined));
    this.setState(this.state.set('loading', false));
    this.setState(this.state.set('error', error));
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
    this.setState(this.state.set('error', err));
  }

  onSetVendorData() {
    this.setState(this.state.set('loading', true));
    this.setState(this.state.set('logged', false));
    this.setState(this.state.set('error', undefined));
  }

  onSetVendorDataSuccess(data) {
    this.setState(this.state.set('logged', true));
    this.setState(this.state.set('loading', false));
    this.setState(this.state.set('user',data.id));
  }

  onSetVendorDataFail(err) {
    this.setState(this.state.set('logged', false));
    this.setState(this.state.set('loading', false));
    this.setState(this.state.set('user', undefined));
    this.setState(this.state.set('error', err.message));
  }
}

export default flux.createStore(VendorStore, 'VendorStore');
