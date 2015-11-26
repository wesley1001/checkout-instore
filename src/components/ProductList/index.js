import React, {PropTypes} from 'react';

import Product from 'components/Product';
import TypeBarcodeReader from 'components/TypeBarcodeReader';
import CheckoutStore from 'stores/CheckoutStore';

import './index.less';

export default class ProductList extends React.Component {
  static propTypes = {
    products: PropTypes.array,
    isUpdatingProduct: PropTypes.bool,
    isAddingProduct: PropTypes.bool
  }

  static defaultProps = {
    products: [],
    isUpdatingProduct: false,
    isAddingProduct: false
  }

  constructor(props) {
    super(props);

    this.state = {
      checkout: CheckoutStore.getState()
    };

    this.handleClick = this.handleClick.bind(this);
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

  handleClick(e) {
    e.preventDefault();
    this.setState({ isExpanded: true });
  }

  checkMoreProducts() {
    const {products} = this.props;

    if (products.length > 1 && !this.state.isExpanded) {
      return (
        <a href="#"
          className="more"
          onClick={this.handleClick}>
          + {products.length - 1} {products.length - 1 === 1 ? 'item' : 'itens'}
        </a>
      );
    }
  }

    render () {
      const {products, orderFormId, history} = this.props;

      let items = products.map((product, index) => {
        return (
          <Product key={product.id}
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
