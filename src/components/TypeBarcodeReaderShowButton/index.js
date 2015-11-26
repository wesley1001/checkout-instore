import React from 'react';
import { Link } from 'react-router';

import CheckoutActions from 'actions/CheckoutActions';

export default class TypeBarcodeReaderShowButton extends React.Component {

  showsBarcodeType() {
    console.log('COMPONENT CLICK');
    CheckoutActions.showTypeBarReaderForm();
  }

  render() {
    return (
      <div id="TypeBarcodeReaderShowButton" className="TypeBarcodeReaderShowButton component">
        <button className="btn btn-default btn-lg btn-block btn-bottom" onClick={this.showsBarcodeType}>Digitar código do produto</button>
      </div>
    );
  }
}
