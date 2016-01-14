import React from 'react';

import CheckoutStore from 'stores/CheckoutStore';
import CartStore from 'stores/CartStore';
import VendorStore from 'stores/VendorStore';

import BarcodeReader from 'components/BarcodeReader';
import ProductShowcase from 'components/ProductShowcase';
import PaymentSelection from 'components/PaymentSelection';
import Logo from 'components/GeneralLogo';
import Loader from 'components/GeneralLoader';
import PaymentForm from 'components/PaymentForm';
import UserInfo from 'components/UserInfo';
import ErrorNotifier from 'components/ErrorNotifier';
import TypeBarcodeReaderShowButton from 'components/TypeBarcodeReaderShowButton';

export default class CartPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkout: CheckoutStore.getState(),
      cart: CartStore.getState(),
      vendor: VendorStore.getState(),
      ofid: this.props.location.query.ofid
    };

    console.log('this.state.ofid', this.state.ofid);

    if(!this.state.ofid && !CartStore.getState().get('orderForm')){
      this.props.history.pushState(null, '/');
    }

    this.onCheckoutChange = this.onCheckoutChange.bind(this);
    this.onCartChange = this.onCartChange.bind(this);
    this.onVendorChange = this.onVendorChange.bind(this);
  }

  componentDidMount() {
    CheckoutStore.listen(this.onCheckoutChange);
    CartStore.listen(this.onCartChange);
    VendorStore.listen(this.onVendorChange);
  }

  componentWillUnmount() {
    CheckoutStore.unlisten(this.onCheckoutChange);
    CartStore.unlisten(this.onCartChange);
  }

  onCartChange(state) {
    this.setState({cart: state});
  }

  onCheckoutChange(state) {
    this.setState({checkout: state});
  }
  onVendorChange(state) {
    this.setState({vendor: state});
  }

  componentDidUpdate() {
    const { cart, ofid } = this.state;

    if(!ofid && (!cart.get('orderForm').items || cart.get('orderForm').items.length === 0)) {
      this.props.history.pushState(null, '/shop');
    }
  }

  render() {
    const {cart, checkout, vendor, ofid} = this.state;
    const orderForm = cart.get('orderForm');
    const tradePolicy = vendor.get('store').tradePolicy;

    if(ofid && !CartStore.getState().get('orderForm')){
      console.log('esperando ofid carregar o order form');
      return (
        <Loader loading={true} />
      );
    }

    return (
      <div className="content">
        <Loader loading={cart.get('loading') || checkout.get('loading')} />

        <header>
          <Logo />
          <UserInfo email={checkout.get('customerEmail')} />
        </header>

        <BarcodeReader orderForm={orderForm} searchingProduct={checkout.get('readingBarcode')} tradePolicy={tradePolicy}>
          <ProductShowcase
            products={orderForm.items}
            isAddingProduct={cart.get('addLoading')}
            isUpdatingProduct={cart.get('updateLoading')}
            cartError={cart.get('error')}
            lastSkuScanned={checkout.get('sku')}
            orderFormId={orderForm.orderFormId}
            history={this.props.history}
          />

          <PaymentSelection
            products={orderForm.items}
            paymentData={orderForm.paymentData}
            orderFormId={orderForm.orderFormId}
            email={checkout.get('customerEmail')}
          />
          <ErrorNotifier message={cart.get('error') || checkout.get('error')} />
        </BarcodeReader>

        <PaymentForm cart={this.state.cart} />
        {this.state.checkout.get('typingBarcode') ? '' : <TypeBarcodeReaderShowButton/>}
      </div>
    );
  }
}
