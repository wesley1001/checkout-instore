import React, {PropTypes} from 'react';

import ProductList from 'components/ProductList';
import OrderHeader from 'components/OrderHeader';


export default class ProductShowcase extends React.Component {
  static propTypes = {
    products: PropTypes.array
  }

  static defaultProps = {
    products: []
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

        </section>
      </section>
    );
  }
}
