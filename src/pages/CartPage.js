import React from 'react';

import CheckoutStore from 'stores/CheckoutStore';
import CartStore from 'stores/CartStore';
import VendorStore from 'stores/VendorStore';
import CookieHelper from 'utils/CookieHelper';
import CartActions from 'actions/CartActions';
import VendorActions from 'actions/VendorActions';
import BarcodeReader from 'components/BarcodeReader';
import ProductShowcase from 'components/ProductShowcase';
import PaymentSelection from 'components/PaymentSelection';
import Logo from 'components/GeneralLogo';
import Loader from 'components/GeneralLoader';
import PaymentForm from 'components/PaymentForm';
import UserInfo from 'components/UserInfo';
import TypeBarcodeReaderShowButton from 'components/TypeBarcodeReaderShowButton';

export default class CartPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkout: CheckoutStore.getState(),
      cart: CartStore.getState(),
      vendor: VendorStore.getState(),
      orderFormId: CookieHelper.getOrderFormId()
    };

    this.onCheckoutChange = this.onCheckoutChange.bind(this);
    this.onCartChange = this.onCartChange.bind(this);
    this.onVendorChange = this.onVendorChange.bind(this);
  }

  componentWillMount() {
    this.handleVendorLoginVerification();
  }

  handleVendorLoginVerification(){
    if(!this.state.vendor.get('logged')) {
      let vendorData = window.localStorage.getItem('vendorData');

      if(vendorData) {
        vendorData = JSON.parse(vendorData);
        VendorActions.SetVendorDataSuccess(vendorData);
      } else  {
        this.props.history.pushState(null, '/vendor/login');
      }
    }
  }

  componentDidMount() {
    CheckoutStore.listen(this.onCheckoutChange);
    CartStore.listen(this.onCartChange);
    VendorStore.listen(this.onVendorChange);

    if(this.shouldRedirectToHomePage()) {
      this.props.history.pushState(null, '/');
    }

    if(this.orderFormWillLoad()){
      CartActions.getOrderForm.defer();
    }

    this.loadStoreInfo();
  }

  loadStoreInfo(){
    const storeData = this.state.vendor.get('store');
    if(storeData && storeData.store && !storeData.tradePolicy) {
      VendorActions.GetStoreInfo.defer(storeData.store);
    }
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
    if(this.shouldRedirectToHomePage()) {
      this.props.history.pushState(null, '/');
    }
  }

  isOrderFormEmpty(){
    const orderForm = this.state.cart.get('orderForm');
    return orderForm && (!orderForm.items || orderForm.items.length === 0);
  }

  orderFormWillLoad(){
    const orderForm = this.state.cart.get('orderForm');
    return this.state.orderFormId && !orderForm;
  }

  shouldRedirectToHomePage(){
    const orderForm = this.state.cart.get('orderForm');
    return !this.orderFormWillLoad() && (!orderForm || this.isOrderFormEmpty());
  }

  render() {
    const {cart, checkout, vendor, orderFormId} = this.state;
    const orderForm = cart.get('orderForm');
    const tradePolicy = vendor.get('store').tradePolicy;

    if(this.orderFormWillLoad() || this.shouldRedirectToHomePage()){
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
        </BarcodeReader>

        <PaymentForm cart={this.state.cart} />
        {this.state.checkout.get('typingBarcode') ? '' : <TypeBarcodeReaderShowButton/>}
      </div>
    );
  }
}
