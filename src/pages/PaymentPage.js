import React from 'react';

import CartStore from 'stores/CartStore';
import CheckoutStore from 'stores/CheckoutStore';

import PaymentInfo from 'components/PaymentInfo';
import PaymentForm from 'components/PaymentForm';
import Logo from 'components/GeneralLogo';
import Loader from 'components/GeneralLoader';
import UserInfo from 'components/UserInfo';
import ErrorNotifier from 'components/ErrorNotifier';

import vtexIdAuthenticated from 'utils/VtexIdAuthenticated';

@vtexIdAuthenticated()
export default class PaymentPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: CartStore.getState(),
      checkout: CheckoutStore.getState()
    };

    this.onCartChange = this.onCartChange.bind(this);
    this.onCheckoutChange = this.onCheckoutChange.bind(this);
  }

  componentDidMount() {
    CartStore.listen(this.onCartChange);
    CheckoutStore.listen(this.onCheckoutChange);
  }

  componentWillUnmount() {
    CartStore.unlisten(this.onCartChange);
    CheckoutStore.unlisten(this.onCheckoutChange);
  }

  onCartChange(state) {
    this.setState({cart: state});
  }

  onCheckoutChange(state) {
    this.setState({checkout: state});
  }

  render() {
    const {cart, checkout} = this.state;
    const orderForm = cart.get('orderForm');

    return (
      <div>
        <Loader loading={cart.get('loading') || checkout.get('loading')} />
        <header className="container">
          <Logo />
          <UserInfo email={checkout.get('customerEmail')} />
        </header>

        <PaymentInfo
          products={orderForm.items}
          paymentData={orderForm.paymentData}
          orderFormId={orderForm.orderFormId}
          checkout={checkout}
        />

        <PaymentForm cart={cart} />
        <ErrorNotifier message={cart.get('error') || checkout.get('error')} />
      </div>
    );
  }
}
