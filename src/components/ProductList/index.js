import React from 'react';

import Product from 'components/Product';

import './index.less';

export default class ProductList extends React.Component {
  static propTypes = {
    products: React.PropTypes.array,
    isUpdatingProduct: React.PropTypes.bool,
    isAddingProduct: React.PropTypes.bool
  }

  static defaultProps = {
    products: [],
    isUpdatingProduct: false,
    isAddingProduct: false
  }

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
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
    const {products, orderFormId} = this.props;
    let items = products.map((product, index) => {
      return (
        <Product key={product.id}
          product={product}
          itemCount={products.length}
          index={index}
          orderFormId={orderFormId}
        />
      );
    });

    return (
      <section className="ProductList component">
        {items}
      </section>
    );
  }
}
