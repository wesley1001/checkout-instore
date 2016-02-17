import React from 'react';
import { Link } from 'react-router';
import './index.less';

import CheckoutActions from 'actions/CheckoutActions';

export default class TypeBarcodeReaderShowButton extends React.Component {

  showsBarcodeType() {
    CheckoutActions.showTypeBarReaderForm();
    CheckoutActions.hideTypeEmailForm();
  }

  render() {
    return (
      <div id="TypeBarcodeReaderShowButton" className="TypeBarcodeReaderShowButton component">
        <button className="btn btn-default btn-lg btn-typebarcode" onClick={this.showsBarcodeType}>Digitar código do produto</button>
      </div>
    );
  }
}
