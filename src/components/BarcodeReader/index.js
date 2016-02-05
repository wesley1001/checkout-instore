import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import CheckoutActions from 'actions/CheckoutActions';
import CartActions from 'actions/CartActions';
import CheckoutStore from 'stores/CheckoutStore';

const BARCODE_MINIMAL_LENGTH = 3;

export default class BarcodeReader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      barcode: '',
      isReading: false
    };

    this.onCheckoutChange = this.onCheckoutChange.bind(this);
    this.handleBarcodeInput = this.handleBarcodeInput.bind(this);
  }

  componentDidMount() {
    CheckoutStore.listen(this.onCheckoutChange);
    window.handleBarcodeRead = this.handleBarcodeInput;
  }

  componentWillUnmount() {
    CheckoutStore.unlisten(this.onCheckoutChange);
    window.handleBarcodeRead = undefined;
  }

  onCheckoutChange(state) {
    const {orderForm} = this.props;
    const sku = state.get('sku');

    if(sku) {
      let item = {
        id: sku,
        quantity: 1,
        seller: 1
      };

      const cartItem = _.find(orderForm.items, {'id': sku.toString()});
      if(cartItem) {
        item.quantity = cartItem.quantity + 1;
        item.index = _.findIndex(orderForm.items, (item) => item.id.toString() === sku.toString())
        CartActions.updateCart.defer({
          orderFormId: orderForm.orderFormId,
          item: [item],
          tradePolicy: this.props.tradePolicy
        });
      } else {
        CartActions.addToCart.defer({
          orderFormId: orderForm.orderFormId,
          item: item,
          tradePolicy: this.props.tradePolicy,
          vendor: this.props.vendor
        });
      }

      CheckoutActions.clearSkuBuffer.defer();
    }
  }

  handleBarcodeInput(value) {
    value = value.toString();

    this.setState({
      barcode: value
    });

    if (this.state.barcode.length >= BARCODE_MINIMAL_LENGTH) {
      CheckoutActions.findProduct(this.state.barcode);
    }
  }

  render() {
    return (
      <div className="BarcodeReader component">
        {this.props.children}
      </div>
    );
  }
}
