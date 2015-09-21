import React from 'react';

import ProductList from 'components/ProductList';
import OrderHeader from 'components/OrderHeader';


export default class ProductShowcase extends React.Component {
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

  render() {
    const {products, isAddingProduct, isUpdatingProduct, orderFormId, history} = this.props;

    return (
      <section className="ProductShowcase component">
        <OrderHeader />

        <section>
          <ProductList
            products={products}
            isAddingProduct={isAddingProduct}
            isUpdatingProduct={isUpdatingProduct}
            orderFormId={orderFormId}
            history={history}
          />

        </section>
      </section>
    );
  }
}
