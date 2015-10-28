import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import CheckoutActions from 'actions/CheckoutActions';
import CartActions from 'actions/CartActions';
import CheckoutStore from 'stores/CheckoutStore';

import './index.less';

export default class BarcodeReader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      barcode: '',
      isReading: false
    };

    this.onCheckoutChange = this.onCheckoutChange.bind(this);
    this.handleBarcodeKeydown = this.handleBarcodeKeydown.bind(this);
    this.handleBarcodeInput = this.handleBarcodeInput.bind(this);
    this.handleBarcodeChange = this.handleBarcodeChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidMount() {
    var context = this;

    if(window.WebViewBridge){
      window.WebViewBridge.onMessage = function(message) {
        message = JSON.parse(message);
        if(message && message.type && message.type == 'event' && message.event == 'barcodeReaded'){
          context.handleBarcodeInput(message.data.barcode);
        }
      };
    }
    else{
      console.warn('WebViewBridge is not defined!');
    }

    this.refs.barcodeInput.focus();
    CheckoutStore.listen(this.onCheckoutChange);

    window.handleBarcodeRead = this.handleBarcodeInput;
  }

  componentWillUnmount() {
    if(window.WebViewBridge){
      window.WebViewBridge.onMessage = function(){};
    }
    else{
      console.warn('WebViewBridge is not defined!');
    }
    CheckoutStore.unlisten(this.onCheckoutChange);
  }

  componentDidUpdate() {
    this.refs.barcodeInput.focus();
  }

  handleBlur() {
    this.refs.barcodeInput.focus();
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
          item: [item],
          tradePolicy: this.props.tradePolicy
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

    if (this.state.barcode.length === 13) {
      CheckoutActions.findProduct(this.state.barcode);
    }
  }

  handleKeyDown(e) {
    if (e.which === 9) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (this.state.barcode.length === 13 && !this.props.searchingProduct) {
      CheckoutActions.findProduct(this.state.barcode);
      this.setState({ barcode: '' });
    }
  }

  handleBarcodeChange(e) {
    this.setState({
      barcode: e.target.value
    });
  }

  handleBarcodeKeydown(e) {
    if (e.which === 9 || e.which === 13) {
      e.preventDefault();
      e.stopPropagation();
    }

    const value = String.fromCharCode(e.keyCode);

    if (/\d/.test(value)) {
      this.setState({
        barcode: this.state.barcode + value,
        isReading: true
      });
    } else {
      this.setState({
        barcode: '',
        isReading: false
      });
    }

    if (this.state.isReading && this.state.barcode.length === 13 && !this.props.searchingProduct) {
      CheckoutActions.findProduct(this.state.barcode);
    }
  }

  render() {
    return (
      <div className="BarcodeReader component">
        {this.props.children}
        <input type="text"
          className="form-control barcode-input"
          value={this.state.barcode}
          onChange={this.handleBarcodeChange}
          onKeyDown={this.handleKeyDown}
          ref="barcodeInput"
          onBlur={this.handleBlur}
          autoComplete="off"
          autoFocus
        />
      </div>
    );
  }
}
