import React from 'react';

import VendorStore from 'stores/VendorStore';
import VendorActions from 'actions/VendorActions';

import VendorAuthentication from 'components/VendorAuthentication';
import Loader from 'components/GeneralLoader';
import Footer from 'components/GeneralFooter';
import ErrorNotifier from 'components/ErrorNotifier';

import 'pages/VendorLoginPage/VendorLoginPage.less';

export default class VendorLogin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      vendor: VendorStore.getState()
    };

    this.onVendorChange = this.onVendorChange.bind(this);
  }

  componentDidMount() {
    VendorStore.listen(this.onVendorChange);
  }

  componentWillUnmount() {
    VendorStore.unlisten(this.onVendorChange);
  }

  onVendorChange(state) {
    this.setState({vendor: state});
  }

  componentDidUpdate() {
    const logged = this.state.vendor.get('logged');

    if(logged) {
      this.props.history.pushState('/');
    }
  }

  render() {
    const {vendor} = this.state;
    return (
      <div className="VendorLoginPage component">
        <Loader loading={this.state.vendor.get('loading')} />
        <div className="email full-pannel full-pannel-show">
          <VendorAuthentication history={this.props.history}/>
        </div>

        <ErrorNotifier message={vendor.get('error')} />
      </div>
    );
  }
}
