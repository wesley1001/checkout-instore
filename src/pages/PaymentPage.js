import React from 'react';

import CheckoutStore from 'stores/CheckoutStore';
import CartStore from 'stores/CartStore';
import CookieHelper from 'utils/CookieHelper';
import PaymentSelection from 'components/PaymentSelection';
import Loader from 'components/GeneralLoader';
import PaymentForm from 'components/PaymentForm';
import UserInfo from 'components/UserInfo';

export default class PaymentPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkout: CheckoutStore.getState(),
      cart: CartStore.getState(),
      orderFormId: CookieHelper.getOrderFormId()
    };

    this.onCheckoutChange = this.onCheckoutChange.bind(this);
    this.onCartChange = this.onCartChange.bind(this);
  }

  componentDidMount() {
    CheckoutStore.listen(this.onCheckoutChange);
    CartStore.listen(this.onCartChange);
    this.checkCartState();
  }

  componentWillUnmount() {
    CheckoutStore.unlisten(this.onCheckoutChange);
    CartStore.unlisten(this.onCartChange);
  }

  onCartChange(state) {
    this.setState({cart: state});
    this.checkCartState();
  }

  checkCartState() {
    const orderForm = this.state.cart.get('orderForm');

    if(!this.state.orderFormId || (orderForm && (!orderForm.items || orderForm.items.length == 0))) {
      this.props.history.pushState(null, '/shop');
    }
  }

  onCheckoutChange(state) {
    this.setState({checkout: state});
  }

  render() {
    const {cart, checkout, orderFormId} = this.state;
    const orderForm = cart.get('orderForm');
    const loading = cart.get('loading') || checkout.get('loading') || !orderForm;

return (
      <div className="content">
        <Loader loading={loading} waitToShow={1} />

        {orderForm ?
          <div>
            <header>
              <UserInfo email={checkout.get('customerEmail')} />
            </header>

              <PaymentSelection
                products={orderForm.items}
                paymentData={orderForm.paymentData}
                orderFormId={orderForm.orderFormId}
                email={checkout.get('customerEmail')}
              />

            <PaymentForm cart={this.state.cart} />
          </div>
         : ''}
      </div>
    );
  }
}
