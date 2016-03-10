import React from 'react';

import VendorActions from 'actions/VendorActions';
import Loader from 'components/GeneralLoader';

export default class VendorLogoutPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    VendorActions.clearVendorData();
    this.props.history.pushState(null, '/vendor/login');
  }

  render() {
    return (
      <div className="VendorLogoutPage component">
        <Loader loading={true} waitToShow={0} />
      </div>
    );
  }
}
