import React, {PropTypes} from 'react';

import ProductDetail from 'components/ProductDetail';

import './index.less';

export default class Product extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    itemCount: PropTypes.number,
    tradePolicy: PropTypes.number
  }

  static defaultProps = {
    data: {name: '', price: 0, quantity: 0, imageUrl: ''},
    itemCount: 1
  }

  render () {
    const {product, itemCount, orderFormId, tradePolicy, history, index} = this.props;

    return (
      <div className="Product component">
         <ProductDetail
           orderSize={itemCount}
           product={product}
           orderFormId={orderFormId}
           history={history}
           tradePolicy={tradePolicy}
           index={index}
         />
      </div>
    );
  }
}
