import React from 'react';
import {Link} from 'react-router';

import CheckoutStore from 'stores/CheckoutStore';
import CartStore from 'stores/CartStore';
import VendorStore from 'stores/VendorStore';
import CookieHelper from 'utils/CookieHelper';
import CartActions from 'actions/CartActions';
import CheckoutActions from 'actions/CheckoutActions';
import BarcodeReader from 'components/BarcodeReader';
import ProductShowcase from 'components/ProductShowcase';
import Loader from 'components/GeneralLoader';
import UserInfo from 'components/UserInfo';
import TypeBarcodeReader from 'components/TypeBarcodeReader';


import 'styles/cartpage.less';

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

    if(!this.state.orderFormId || (orderForm && (!orderForm.items || orderForm.items.length == 0))) {
      this.props.history.pushState(null, '/shop');
    }
  }

  onCheckoutChange(state) {
    this.setState({checkout: state});
  }

  onVendorChange(state) {
    this.setState({vendor: state});
  }

  showsBarcodeType() {
    CheckoutActions.showTypeBarReaderForm();
    CheckoutActions.hideTypeEmailForm();
  }

  render() {
    const {cart, checkout, vendor, orderFormId} = this.state;
    const orderForm = cart.get('orderForm');
    const tradePolicy = vendor.get('store').tradePolicy;
    const loading = cart.get('loading') || checkout.get('loading') || !orderForm;

    return (
      <div className="content">
        <Loader loading={loading} waitToShow={1} />

        {orderForm ?
          <div>
            <header className="cartHeader">
            {
              checkout.get('typingBarcode') ? '' :
              <a className="type-button" onClick={this.showsBarcodeType}>Digitar código do produto</a>
            }
            {checkout.get('typingBarcode') ? <TypeBarcodeReader /> : ''}
            </header>

            <BarcodeReader orderForm={orderForm} searchingProduct={checkout.get('readingBarcode')} tradePolicy={tradePolicy}>
              <ProductShowcase
                products={orderForm.items}
                cartError={cart.get('error')}
                lastSkuScanned={checkout.get('sku')}
                orderFormId={orderForm.orderFormId}
                history={this.props.history}
              />
            </BarcodeReader>
            <div className="bottom-bar container">
              <Link to="/payment" type="submit" className="btn btn-success btn-lg btn-block">Ir para o Pagamento</Link>
            </div>
          </div>
         : ''}
      </div>
    );
  }
}
