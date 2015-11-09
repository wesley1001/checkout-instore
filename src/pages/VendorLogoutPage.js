import React from 'react';

import VendorActions from 'actions/VendorActions';
import Loader from 'components/GeneralLoader';

export default class VendorLogoutPage extends React.Component {
  constructor(props) {
    super(props);

    window.localStorage.removeItem('vendorData');
  }

  componentDidMount() {
    VendorActions.clearVendorData();
    this.props.history.pushState('/vendor/login');
  }

  render() {
    return (
      <div className="content">
        <Loader loading={true} />
      </div>
    );
  }
}
