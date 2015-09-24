import React from 'react';

import CheckoutStore from 'stores/CheckoutStore';
import CartStore from 'stores/CartStore';
import CartActions from 'actions/CartActions';

import UserAuthentication from 'components/UserAuthentication';
import Logo from 'components/GeneralLogo';
import Loader from 'components/GeneralLoader';
import Footer from 'components/GeneralFooter';
import ErrorNotifier from 'components/ErrorNotifier';

import vtexIdAuthenticated from 'utils/VtexIdAuthenticated';
import vendorAuthenticated from 'utils/VendorAuthenticated';
import checkConnection from 'utils/CheckConnection';
import setViewport from 'utils/SetViewport';

@vtexIdAuthenticated()
@vendorAuthenticated()
@setViewport
@checkConnection
export default class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkout: CheckoutStore.getState(),
      cart: CartStore.getState()
    };

    this.onCheckoutChange = this.onCheckoutChange.bind(this);
    this.onCartChange = this.onCartChange.bind(this);
  }

  componentDidMount() {
    CheckoutStore.listen(this.onCheckoutChange);
    CartStore.listen(this.onCartChange);

    const orderForm = this.state.cart.get('orderForm');

    if(!orderForm) {
      CartActions.getOrderForm();
    } else {
      CartActions.clearCart.defer(orderForm);
    }
  }

  componentWillUnmount() {
    CheckoutStore.unlisten(this.onCheckoutChange);
    CartStore.unlisten(this.onCartChange);
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
      <div>
        <Loader loading={cart.get('loading') || checkout.get('loading')} />
        <header className="container">
          <Logo />
        </header>

        <div className="email full-pannel full-pannel-show">
          <UserAuthentication orderForm={cart.get('orderForm')} history={this.props.history}/>
        </div>

        <ErrorNotifier message={cart.get('error') || checkout.get('error')} />
        <Footer />
      </div>
    );
  }
}
