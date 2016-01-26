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
      store: {},
      loading: false,
      error: ''
    });
  }

  onGetStoreInfo() {
    this.setState(this.state.set('loading', true));
    this.setState(this.state.set('store', _.merge(this.state.get('store'), {tradePolicy: undefined})));
  }

  onGetStoreInfoSuccess(data) {
    this.setState(this.state.set('loading', false));
    this.setState(this.state.set('store', _.merge(this.state.get('store'), data)));
    this.setState(this.state.set('error', ''));
  }

  onGetStoreInfoFail(error) {
    this.setState(this.state.set('loading', false));
    this.setState(this.state.set('store', _.merge(this.state.get('store'), {tradePolicy: undefined})));
    this.setState(this.state.set('error', error.message));
  }

  onSetVendorData() {
    this.setState(this.state.set('loading', true));
    this.setState(this.state.set('logged', false));
    this.setState(this.state.set('user', undefined));
    this.setState(this.state.set('store', {}));
    this.setState(this.state.set('error', ''));
  }

  onSetVendorDataSuccess(data) {
    this.setState(this.state.set('loading', false));

    this.setState(this.state.set('logged', true));
    this.setState(this.state.set('user', data.user));

    this.setState(this.state.set('store', _.merge(this.state.get('store'), {store:data.user.store})));
    this.setState(this.state.set('error', ''));
  }

  onSetVendorDataFail(error) {
    this.setState(this.state.set('loading', false));
    this.setState(this.state.set('logged', false));
    this.setState(this.state.set('user', undefined));
    this.setState(this.state.set('store', {}));
    this.setState(this.state.set('error', error.message));
  }

  onClearVendorData()  {
    this.setState(this.state.set('loading', false));
    this.setState(this.state.set('logged', false));
    this.setState(this.state.set('user', undefined));
    this.setState(this.state.set('store', {}));
    this.setState(this.state.set('error', ''));
  }
}

export default flux.createStore(VendorStore, 'VendorStore');
