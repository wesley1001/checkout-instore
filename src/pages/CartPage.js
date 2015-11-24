import React from 'react';

import CheckoutStore from 'stores/CheckoutStore';
import CartStore from 'stores/CartStore';

import BarcodeReader from 'components/BarcodeReader';
import ProductShowcase from 'components/ProductShowcase';
import PaymentSelection from 'components/PaymentSelection';
import Logo from 'components/GeneralLogo';
import Loader from 'components/GeneralLoader';
import PaymentForm from 'components/PaymentForm';
import UserInfo from 'components/UserInfo';
import ErrorNotifier from 'components/ErrorNotifier';
import TypeBarcodeReader from 'components/TypeBarcodeReader';

export default class CartPage extends React.Component {
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

  componentDidUpdate() {
    const { cart } = this.state;

    if(!cart.get('orderForm').items || cart.get('orderForm').items.length === 0) {
      this.props.history.pushState(null, '/shop');
    }
  }

  render() {
    const {cart, checkout} = this.state;
    const orderForm = cart.get('orderForm');

    return (
      <div className="content">
        <Loader loading={cart.get('loading') || checkout.get('loading')} />

        <header className="container">
          <Logo />
          <UserInfo email={checkout.get('customerEmail')} />
        </header>

        <div className="container">
          <TypeBarcodeReader/>
        </div>

        <BarcodeReader orderForm={orderForm} searchingProduct={checkout.get('readingBarcode')} tradePolicy={checkout.get('tradePolicy')}>
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
      </div>
    );
  }
}
