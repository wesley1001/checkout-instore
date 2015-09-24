import flux from '../flux';
import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';

import VendorActions from 'actions/VendorActions';

@immutable
class VendorStore {
  constructor() {
    this.bindActions(VendorActions);

    this.state = Immutable.Map({
      logged: false
    });
  }

  onLoginSuccess(data) {
    this.setState(this.state.set('logged', true));
  }

  onLoginFailed(error) {
    this.setState(this.state.set('logged', false));
  }
}

export default flux.createStore(VendorStore, 'VendorStore');
