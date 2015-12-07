import React, {PropTypes} from 'react';

import CartActions from 'actions/CartActions';
import VendorStore from 'stores/VendorStore';

import ProductHelper from 'utils/ProductHelper';

import './index.less';

export default class ProductDetail extends React.Component {
  static propTypes = {
    orderSize: PropTypes.number,
    product: PropTypes.object,
    orderFormId: PropTypes.string
  }

  static defaultProps = {
    orderSize: 0,
    product: {},
    orderFormId: ''
  }

  constructor(props) {
    super(props);

    this.state = {
      vendor: VendorStore.getState()
    };

    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove(e) {
    e.preventDefault();

    const tradePolicy = this.state.vendor.get('store').tradePolicy;

    let product = this.props.product;
    product.quantity = 0;
    product.index = this.props.index;

    CartActions.updateCart({
      orderFormId: this.props.orderFormId,
      item: [product],
      tradePolicy: tradePolicy
    });
  }

  render() {
    const {product} = this.props;

    let priceElement = (data) => {
      if(data.price !== data.sellingPrice) {
        return (
          <strong className="price">
            R$ <span className="discount">{ProductHelper.formatPrice(data.price / 100)}</span>  {ProductHelper.formatPrice(data.sellingPrice / 100)}
          </strong>
        );
      }
      else {
        return (
          <strong className="price">
            R$ {ProductHelper.formatPrice(data.price / 100)}
          </strong>
        );
      }
    }(product);
    return (
      <div className="ProductDetail component">
        <div className="img-wrapper">
          <img className="img" src={product.imageUrl}/>
          <span className="quantity">{product.quantity}</span>
        </div>
        <div className="info">
          <div className="name">{product.name}</div>
          {priceElement}
        </div>
        <div className="remove">
         <a href="javascript:void(0)"
           className="glyphicon glyphicon-remove"
           onClick={this.handleRemove}>
         </a>
        </div>
      </div>
    );
  }
}
