import React from 'react';

import 'styles/main.less';

import setViewport from 'utils/SetViewport';

import CheckoutActions from '../actions/CheckoutActions';
import VendorActions from '../actions/VendorActions';

@setViewport
export default class App extends React.Component {

  componentDidMount(){
    let context = this;

    if(window.WebViewBridge) {
      window.WebViewBridge.onMessage = (message) => {
        message = JSON.parse(message);
        if(message && message.type === 'event') {
          switch (message.event) {
            case 'barcodeReaded':
              CheckoutActions.findProduct(message.data.barcode);
              break;
            case 'vendorLogoutIntent':
              VendorActions.clearVendorData();
              this.props.history.pushState(null, '/vendor/login');
              break;
            case 'goHome':
              this.props.history.pushState(null, '/');
              break;
          }
        }
      };
    } else {
      console.warn('WebViewBridge is not defined!');
    }
  }

  componentWillUnmount(){
    if(window.WebViewBridge) {
      window.WebViewBridge.onMessage = function(){};
    } else {
      console.warn('WebViewBridge is not defined!');
    }
  }

  render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}
