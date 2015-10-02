import React from 'react';

import VtexActions from 'actions/VtexActions';
import VendorStore from 'stores/VendorStore';

import checkConnection from 'utils/CheckConnection';
import setViewport from 'utils/SetViewport';

@setViewport
@checkConnection
export default class VtexAuth extends React.Component {
  constructor(props) {
    super(props);

    this.onVendorChange = this.onVendorChange.bind(this);
  }

  componentDidMount() {
    VendorStore.listen(this.onVendorChange);

    VtexActions.login();
  }

  componentWillUnmount() {
    VendorStore.unlisten(this.onVendorChange);
  }

  onVendorChange(state) {
    if(state.get('vtexIdLogged')) {
      let that = this;
      setTimeout(() =>  {
        that.props.history.pushState(null, '/');
      }, 0);
    }
  }


  render() {
    return (
      <div>
      </div>
    );
  }
}
