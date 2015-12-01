import React from 'react';
import cookie from 'react-cookie';

import CheckoutStore from 'stores/CheckoutStore';
import CartStore from 'stores/CartStore';
import VendorStore from 'stores/VendorStore';

import CartActions from 'actions/CartActions';
import VendorActions from 'actions/VendorActions';

import UserAuthentication from 'components/UserAuthentication';
import UserAnonymous from 'components/UserAnonymous';
import Loader from 'components/GeneralLoader';
import Footer from 'components/GeneralFooter';
import ErrorNotifier from 'components/ErrorNotifier';

import client from 'assets/images/client.svg';

import 'styles/homepage.less';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkout: CheckoutStore.getState(),
      cart: CartStore.getState(),
      vendor: VendorStore.getState()
    };

    cookie.remove('checkout.vtex.com');

    this.onVendorChange = this.onVendorChange.bind(this);
    this.onCheckoutChange = this.onCheckoutChange.bind(this);
    this.onCartChange = this.onCartChange.bind(this);
  }

  componentWillMount() {
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

    const orderForm = this.state.cart.get('orderForm');

    if(!orderForm) {
      CartActions.getOrderForm.defer();
    }

    const storeData = this.state.vendor.get('store');
    if(storeData) {
      VendorActions.GetStoreInfo.defer(storeData.store);
    }
  }

  componentWillUnmount() {
    CheckoutStore.unlisten(this.onCheckoutChange);
    CartStore.unlisten(this.onCartChange);
    VendorStore.unlisten(this.onVendorChange);
  }

  onVendorChange(state) {
    this.setState({vendor: state});
  }

  onCheckoutChange(state) {
    this.setState({checkout: state});
  }

  onCartChange(state) {
    this.setState({cart: state});
  }

  componentDidUpdate() {
    const orderForm = this.state.cart.get('orderForm');

    if(orderForm) {
      CartActions.clearCart.defer(orderForm);
    }
  }

  render() {
    const {cart, checkout} = this.state;
    return (
      <div className="HomePage component">
        <Loader loading={cart.get('loading') || checkout.get('loading')} />
        <header className="container"></header>

        <div className="email full-pannel full-pannel-show">
          <div className="UserAuthenticationWrapper">
            <div className="img-box">
              <img src={client} className="img"/>
            </div>
            <h2 className="title main-title">
              <span className="main-title-name">Cliente</span>
              <span className="main-title-border"></span>
            </h2>

            <div className="container">
              <UserAuthentication orderForm={cart.get('orderForm')} history={this.props.history}/>
              <div className="help-block text">Ao identificar o cliente, ele terá a vantagem de receber o comprovante por email.</div>
            </div>
          </div>
        </div>

        <UserAnonymous orderForm={cart.get('orderForm')} history={this.props.history}/>

        <ErrorNotifier message={cart.get('error') || checkout.get('error')} />
        <Footer />
      </div>
    );
  }
}
