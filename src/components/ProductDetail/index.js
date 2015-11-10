import React, {PropTypes} from 'react';

import CartActions from 'actions/CartActions';
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

    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove(e) {
    e.preventDefault();

    let product = this.props.product;
    product.quantity = 0;
    product.index = this.props.index;

    CartActions.updateCart({
      orderFormId: this.props.orderFormId,
      item: [product]
    });
  }

  render() {
    const {product} = this.props;

    return (
      <div className="ProductDetail component">
        <div className="img-wrapper">
          <img className="img" src={product.imageUrl}/>
          <span className="quantity">{product.quantity}</span>
        </div>
        <div className="info">
          <div className="name">{product.name}</div>
          <strong className="price">
            R$ {ProductHelper.formatPrice(product.price / 100)}
          </strong>
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
