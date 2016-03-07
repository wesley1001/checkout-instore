import React from 'react';

import CheckoutStore from 'stores/CheckoutStore';
import CartStore from 'stores/CartStore';
import VendorStore from 'stores/VendorStore';

import CartActions from 'actions/CartActions';
import VendorActions from 'actions/VendorActions';

import UserAuthentication from 'components/UserAuthentication';
import UserAnonymous from 'components/UserAnonymous';
import Loader from 'components/GeneralLoader';
import Footer from 'components/GeneralFooter';
import CookieHelper from 'utils/CookieHelper';

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

    this.onVendorChange = this.onVendorChange.bind(this);
    this.onCheckoutChange = this.onCheckoutChange.bind(this);
    this.onCartChange = this.onCartChange.bind(this);
  }

  componentDidMount() {
    CheckoutStore.listen(this.onCheckoutChange);
    CartStore.listen(this.onCartChange);
    VendorStore.listen(this.onVendorChange);
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

  render() {
    const {cart, checkout} = this.state;
    if(!this.state.cart.get('orderForm')){
      return null;
    }
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
              <UserAuthentication
                orderForm={cart.get('orderForm')}
                history={this.props.history}
                customerEmail={checkout.get('customerEmail')} />

              <div className="help-block text">Ao identificar o cliente, ele terá a vantagem de receber o comprovante por email.</div>
            </div>
          </div>
        </div>

        <UserAnonymous orderForm={cart.get('orderForm')} history={this.props.history}/>
        <Footer />
      </div>
    );
  }
}
