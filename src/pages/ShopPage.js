import React from 'react';

import CheckoutStore from 'stores/CheckoutStore';
import VendorStore from 'stores/VendorStore';
import CartStore from 'stores/CartStore';
import CartActions from 'actions/CartActions';

import BarcodeReader from 'components/BarcodeReader';
import ScanIndicator from 'components/ScanIndicator';
import OrderHeader from 'components/OrderHeader';
import Loader from 'components/GeneralLoader';
import UserInfo from 'components/UserInfo';

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
    CheckoutStore.listen(this.onCheckoutChange);
    CartStore.listen(this.onCartChange);
    VendorStore.listen(this.onVendorChange);

    this.setCartInfo();
  }

  componentWillUnmount() {
    CheckoutStore.unlisten(this.onCheckoutChange);
    CartStore.unlisten(this.onCartChange);
    VendorStore.unlisten(this.onVendorChange);
  }

  onCartChange(state) {
    this.setState({cart: state});

    this.setCartInfo();
  }

  setCartInfo() {
    const state = this.state.cart;

    if(state.get('orderForm').items && state.get('orderForm').items.length > 0) {
      this.props.history.pushState(null, '/cart');

      const loading = state.get('loading');
      const mktData = state.get('orderForm').marketingData;
      const isCheckedIn = state.get('orderForm').isCheckedIn;

      if(!loading) {
        if(mktData == null || !mktData.utmSource) {
          CartActions.setVendor.defer();
        }
        else if(isCheckedIn !== true) {
          CartActions.checkIn.defer();
        }
      }
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
    const user = vendor.get('user');
    const store = vendor.get('store');

    const vendorId = user ? user.id : null;
    const tradePolicy = store ? store.tradePolicy : null;

    return (
      <div className="content">
        <Loader loading={cart.get('loading') || checkout.get('loading')} />

        <header>
          <UserInfo email={checkout.get('customerEmail')} />
        </header>

        <BarcodeReader
          orderForm={cart.get('orderForm')}
          searchingProduct={checkout.get('readingBarcode')}
          tradePolicy={tradePolicy}
          vendor={vendorId}>
          <OrderHeader />
          <ScanIndicator />
        </BarcodeReader>
      </div>
    );
  }
}
