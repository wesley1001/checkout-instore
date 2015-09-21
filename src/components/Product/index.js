import React, {PropTypes} from 'react';

import ProductDetail from 'components/ProductDetail';

import './index.less';

export default class Product extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    itemCount: PropTypes.number
  }

  static defaultProps = {
    data: {name: '', price: 0, quantity: 0, imageUrl: ''},
    itemCounte: 1
  }

  render () {
    const {product, itemCount, orderFormId} = this.props;

    return (
      <div className="Product component">
         <ProductDetail
           orderSize={itemCount}
           product={product}
           orderFormId={orderFormId}
           history={history}
         />
      </div>
    );
  }
}
