import React from 'react';

import VendorActions from 'actions/VendorActions';
import VendorStore from 'stores/VendorStore';

import VendorAuthentication from 'components/VendorAuthentication';

import vtexIdAuthenticated from 'utils/VtexIdAuthenticated';
import checkConnection from 'utils/CheckConnection';
import setViewport from 'utils/SetViewport';

@vtexIdAuthenticated()
@setViewport
@checkConnection
export default class VendorLogin extends React.Component {
  constructor(props) {
    super(props);

    this.onVendorChange = this.onVendorChange.bind(this);
  }

  componentDidMount() {
    VendorStore.listen(this.onVendorChange);
  }

  componentWillUnmount() {
    VendorStore.unlisten(this.onVendorChange);
  }

  onVendorChange(state) {
    if(state.get('vendorId')) {
      that.props.history.pushState(null, '/');
    }
  }


  render() {
    return (
      <div className="vendor-component">
        <VendorAuthentication/>
      </div>
    );
  }
}
