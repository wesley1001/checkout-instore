import React, {PropTypes} from 'react';

import Product from 'components/Product';
import TypeBarcodeReader from 'components/TypeBarcodeReader';
import CheckoutStore from 'stores/CheckoutStore';

import './index.less';

export default class ProductList extends React.Component {
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

    render () {
      const {products, orderFormId, history} = this.props;

      let items = products.map((product, index) => {
        return (
          <Product key={index}
            product={product}
            itemCount={products.length}
            index={index}
            orderFormId={orderFormId}
            history={history}
          />
        );
      });

      return (
        <section className="ProductList component">
          {this.state.checkout.get('typingBarcode') ? <TypeBarcodeReader/> : ''}
          {items}
        </section>
      );
    }
}
