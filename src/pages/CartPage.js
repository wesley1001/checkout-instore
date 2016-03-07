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
import Loader from 'components/GeneralLoader';
import PaymentForm from 'components/PaymentForm';
import UserInfo from 'components/UserInfo';

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

  componentDidMount() {
    CheckoutStore.listen(this.onCheckoutChange);
    CartStore.listen(this.onCartChange);
    VendorStore.listen(this.onVendorChange);

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
    const orderFormHasItems = orderForm && orderForm.items && orderForm.items.length > 0;

    if(!this.state.orderFormId && !orderFormHasItems) {
      this.props.history.pushState(null, '/shop');
    }
  }

  onCheckoutChange(state) {
    this.setState({checkout: state});
  }

  onVendorChange(state) {
    this.setState({vendor: state});
  }

  render() {
    const {cart, checkout, vendor, orderFormId} = this.state;
    const orderForm = cart.get('orderForm');
    const tradePolicy = vendor.get('store').tradePolicy;
    const loading = cart.get('loading') || checkout.get('loading') || !orderForm;

    return (
      <div className="content">
        <Loader loading={loading} />

        {orderForm ?
          <div>
            <header>
              <UserInfo email={checkout.get('customerEmail')} />
            </header>

            <BarcodeReader orderForm={orderForm} searchingProduct={checkout.get('readingBarcode')} tradePolicy={tradePolicy}>
              <ProductShowcase
                products={orderForm.items}
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
          </div>
         : ''}
      </div>
    );
  }
}
