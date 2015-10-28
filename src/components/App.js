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

  componentWillMount(){
    if(!this.state.vendor.get('logged')) {
      this.props.history.pushState(null, '/vendor/login');
    }
  }

  componentDidMount() {
    VendorStore.listen(this.onVendorChange);
  }

  onVendorChange(state) {
    this.setState({vendor: state});
  }

  render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}
