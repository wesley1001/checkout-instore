import React, {PropTypes} from 'react';

import CheckoutStore from 'stores/CheckoutStore';
import CheckoutActions from 'actions/CheckoutActions';

import ProductList from 'components/ProductList';
import OrderHeader from 'components/OrderHeader';
import TypeBarcodeReaderShowButton from 'components/TypeBarcodeReaderShowButton';
import TypeBarcodeReader from 'components/TypeBarcodeReader';

import './index.less';

export default class ProductShowcase extends React.Component {
  static propTypes = {
    products: PropTypes.array
  }

  static defaultProps = {
    products: []
  }

  constructor(props) {
    super(props);

    this.state = {
      checkout: CheckoutStore.getState()
    };

    this.onCheckoutChange = this.onCheckoutChange.bind(this);
  }

  onCheckoutChange(state) {
    this.setState({checkout: state});
  }

  componentDidMount() {
    CheckoutStore.listen(this.onCheckoutChange);
  }

  componentWillUnmount() {
    CheckoutStore.unlisten(this.onCheckoutChange);
  }

  showsBarcodeType() {
    CheckoutActions.showTypeBarReaderForm();
    CheckoutActions.hideTypeEmailForm();
  }

  render() {
    const {products, orderFormId, history} = this.props;

    return (
      <section className="ProductShowcase component">
        <OrderHeader />

        <section>
          <ProductList
            products={products}
            orderFormId={orderFormId}
            history={history}
          />
          {
            this.state.checkout.get('typingBarcode') ? '' :
            <button className="btn btn-default btn-lg type-button" onClick={this.showsBarcodeType}>Digitar código do produto</button>
          }
          {this.state.checkout.get('typingBarcode') ? <TypeBarcodeReader /> : ''}

        </section>
      </section>
    );
  }
}
