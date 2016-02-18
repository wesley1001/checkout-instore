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

  onSetInstoreData() {
    this.setState(this.state.set('loading', true));
    this.setState(this.state.set('logged', false));
    this.setState(this.state.set('user', undefined));
    this.setState(this.state.set('store', {}));
    this.setState(this.state.set('error', ''));
  }

  onSetInstoreDataSuccess(data) {
    this.setState(this.state.set('loading', false));

    this.setState(this.state.set('logged', true));
    this.setState(this.state.set('user', data.user));
    this.setState(this.state.set('store', _.merge(this.state.get('store'), data.store)));
    this.setState(this.state.set('error', ''));
  }

  onSetInstoreDataFail(error) {
    this.setState(this.state.set('loading', false));
    this.setState(this.state.set('logged', false));
    this.setState(this.state.set('user', undefined));
    this.setState(this.state.set('store', {}));
    this.setState(this.state.set('error', error.message));
  }

  onClearInstoreData()  {
    this.setState(this.state.set('loading', false));
    this.setState(this.state.set('logged', false));
    this.setState(this.state.set('user', undefined));
    this.setState(this.state.set('store', {}));
    this.setState(this.state.set('error', ''));
  }

  onDismissCurrentNotifications(){
    this.setState(this.state.set('error', ''));
  }
}

export default flux.createStore(VendorStore, 'VendorStore');
