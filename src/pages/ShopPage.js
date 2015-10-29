import React from 'react';

import CheckoutStore from 'stores/CheckoutStore';
import VendorStore from 'stores/VendorStore';
import CartStore from 'stores/CartStore';
import CartActions from 'actions/CartActions';

import BarcodeReader from 'components/BarcodeReader';
import ScanIndicator from 'components/ScanIndicator';
import OrderHeader from 'components/OrderHeader';
import Logo from 'components/GeneralLogo';
import Loader from 'components/GeneralLoader';
import UserInfo from 'components/UserInfo';
import ErrorNotifier from 'components/ErrorNotifier';

export default class ShopPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkout: CheckoutStore.getState(),
      cart: CartStore.getState(),
      vendor: VendorStore.getState()
    };

    this.onCartChange = this.onCartChange.bind(this);
    this.onCheckoutChange = this.onCheckoutChange.bind(this);
    this.onVendorChange = this.onVendorChange.bind(this);
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
    VendorStore.listen(this.onVendorChange);
  }

  componentWillUnmount() {
    CheckoutStore.unlisten(this.onCheckoutChange);
    CartStore.unlisten(this.onCartChange);
    VendorStore.unlisten(this.onVendorChange);
  }

  onCartChange(state) {
    this.setState({cart: state});

    if(state.get('orderForm').items && state.get('orderForm').items.length > 0) {
      this.props.history.pushState(null, '/cart');
    }
  }

  onCheckoutChange(state) {
    this.setState({checkout: state});
  }

  onVendorChange(state) {
    this.setState({vendor: state});
  }

  render() {
    const {cart, checkout, vendor} = this.state;

    return (
      <div className="content">
        <Loader loading={cart.get('loading') || checkout.get('loading')} />

        <header className="container">
          <Logo />
          <UserInfo email={checkout.get('customerEmail')} />
        </header>

        <BarcodeReader
          orderForm={cart.get('orderForm')}
          searchingProduct={checkout.get('readingBarcode')}
          tradePolicy={checkout.get('tradePolicy')}
          vendor={vendor.get('user')}>
          <OrderHeader />
          <ScanIndicator />
          <ErrorNotifier message={cart.get('error') || checkout.get('error')} />
        </BarcodeReader>
      </div>
    );
  }
}
