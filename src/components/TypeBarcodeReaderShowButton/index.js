import React from 'react';
import { Link } from 'react-router';

import CheckoutActions from 'actions/CheckoutActions';

export default class TypeBarcodeReaderShowButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true
    };

    this.showsBarcodeType = this.showsBarcodeType.bind(this);
  }

  showsBarcodeType() {
    this.setState({ visible: false });
    CheckoutActions.showTypeBarReaderForm(true);
  }

  render() {
    let button;

    if (this.state.visible === true) {
      button = (
        <button className="btn btn-default btn-lg btn-block btn-bottom" onClick={this.showsBarcodeType}>Digitar código do produto</button>
      );
    } else {
      button = null;
    }

    return (
      <div id="TypeBarcodeReaderShowButton" className="TypeBarcodeReaderShowButton component">
        {button}
      </div>
    );
  }
}
