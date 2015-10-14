import React from 'react';

import VendorStore from 'stores/VendorStore';
import VendorActions from 'actions/VendorActions';

import 'styles/main.less';

import checkConnection from 'utils/CheckConnection';
import setViewport from 'utils/SetViewport';

@setViewport
@checkConnection
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      vendor: VendorStore.getState()
    };

    this.onVendorChange = this.onVendorChange.bind(this);
  }

  componentDidMount() {
    VendorStore.listen(this.onVendorChange);

    if(!this.state.vendor.get('vtexIdLogged')) {
      VendorActions.CheckLogin();
    }
  }

  onVendorChange(state) {
    this.setState({vendor: state});
  }

  render() {
    return (
      <div>
        {this.state.vendor.get('vtexIdLogged') ? this.props.children : ''}
      </div>
    );
  }
}
