import React from 'react';

import VendorActions from 'actions/VendorActions';
import VendorStore from 'stores/VendorStore';

import checkConnection from 'utils/CheckConnection';
import setViewport from 'utils/SetViewport';

@setViewport
@checkConnection
export default class VendorAuth extends React.Component {
  constructor(props) {
    super(props);

    this.onVendorChange = this.onVendorChange.bind(this);
  }

  componentDidMount() {
    VendorStore.listen(this.onVendorChange);

    VendorActions.login();
  }

  onVendorChange(state) {
    if(state.get('logged')) {
      let that = this;
      setTimeout(() =>  {
        console.log('redirecting...');
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
