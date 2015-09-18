import React from 'react';

import CartActions from 'actions/CartActions';
import ProductHelper from 'utils/ProductHelper';

import './index.less';

export default class ProductDetail extends React.Component {
  static contextTypes = {
    router: React.PropTypes.func.isRequired
  }

  static propTypes = {
    name: React.PropTypes.string,
    price: React.PropTypes.number,
    quantity: React.PropTypes.number,
    source: React.PropTypes.string
  }

  static defaultProps = {
    name: '',
    price: 0,
    quantity: 1,
    source: ''
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

    if(this.props.orderSize - 1 === 0) {
      this.context.router.transitionTo('instore_authentication');
    } else {
      CartActions.updateCart({
        orderFormId: this.props.orderFormId,
        item: [product]
      });
    }
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
