import React from 'react';

import VendorStore from 'stores/VendorStore';

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

  onVendorChange(state) {
    this.setState({vendor: state});
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
