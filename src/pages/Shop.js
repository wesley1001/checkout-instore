import React from 'react';

import CheckoutStore from 'stores/CheckoutStore';
import CartStore from 'stores/CartStore';
import CartActions from 'actions/CartActions';

import BarcodeReader from 'components/BarcodeReader';
import ScanIndicator from 'components/ScanIndicator';
import OrderHeader from 'components/OrderHeader';
import Logo from 'components/GeneralLogo';
import Loader from 'components/GeneralLoader';
import UserInfo from 'components/UserInfo';
import ErrorNotifier from 'components/ErrorNotifier';

import checkConnection from 'utils/CheckConnection';
import setViewport from 'utils/SetViewport';

@setViewport
@checkConnection
export default class Shop extends React.Component {
  static contextTypes = {
    router: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      checkout: CheckoutStore.getState(),
      cart: CartStore.getState()
    };

    this.onCartChange = this.onCartChange.bind(this);
    this.onCheckoutChange = this.onCheckoutChange.bind(this);
  }

  componentDidMount() {
    const shippingRequest = {
        addressType: 'residental',
        receiverName: 'cliente',
        addressId: '-1387193636431',
        postalCode: '02055-000',
        city: 'Sao Paulo',
        state: 'SP',
        country: 'BRA',
        street: 'Rua Jose Bernardo Pinto',
        number: '333',
        neighborhood: 'Vila Guilherme',
        complement: 'Estande Loja do Futuro',
        reference: null,
        geoCoordinates: []
    };
    CartActions.setShipping.defer({orderFormId: this.state.cart.get('orderForm').orderFormId, address: shippingRequest});

    CheckoutStore.listen(this.onCheckoutChange);
    CartStore.listen(this.onCartChange);
  }

  componentWillUnmount() {
    CheckoutStore.unlisten(this.onCheckoutChange);
    CartStore.unlisten(this.onCartChange);
  }

  onCartChange(state) {
    this.setState({cart: state});

    if(state.get('orderForm').items && state.get('orderForm').items.length > 0) {
      this.context.router.transitionTo('instore_cart');
    }
  }

  onCheckoutChange(state) {
    this.setState({checkout: state});
  }

  render() {
    const {cart, checkout} = this.state;

    return (
      <div className="content">
        <Loader loading={cart.get('loading') || checkout.get('loading')} />

        <header className="container">
          <Logo />
          <UserInfo email={checkout.get('customerEmail')} />
        </header>

        <BarcodeReader orderForm={cart.get('orderForm')} searchingProduct={checkout.get('readingBarcode')}>
          <OrderHeader />
          <ScanIndicator />
          <ErrorNotifier message={cart.get('error') || checkout.get('error')} />
        </BarcodeReader>
      </div>
    );
  }
}
