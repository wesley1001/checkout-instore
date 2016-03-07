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
      vendor: VendorStore.getState(),
      showOptions: false,
      productQuantity: this.props.product.quantity
    };

    this.handleRemove = this.handleRemove.bind(this);
    this.handleShowOptions = this.handleShowOptions.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    const tradePolicy = this.state.vendor.get('store').tradePolicy;
    let product = this.props.product;
    product.quantity = e.target.value;
    product.index = this.props.index;
    CartActions.updateCart({
      orderFormId: this.props.orderFormId,
      item: [product],
      tradePolicy: tradePolicy
    });
  }

  handleShowOptions(e) {
    e.preventDefault();

    this.setState({showOptions : !this.state.showOptions});
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
          <div className="price">
            <span className="currency"> R$ </span> <span className="discount">{ProductHelper.formatPrice(data.price / 100)}</span> R$ {ProductHelper.formatPrice(data.sellingPrice / 100)}
          </div>
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
        </div>
        <div className="info">
          <div className="name">{product.name}</div>
          <div className="actions">
              <span className="caret"></span>
              <select type ="button" value={product.quantity} className="btn btn-default dropdown-toggle quantity" onChange={this.handleSubmit}>
                  <option className="option" value="1">1</option>
                  <option className="option" value="2">2</option>
                  <option className="option" value="3">3</option>
                  <option className="option" value="4">4</option>
                  <option className="option" value="5">5</option>
                  <option className="option" value="6">6</option>
                  <option className="option" value="7">7</option>
                  <option className="option" value="8">8</option>
                  <option className="option" value="9">9</option>
                  <option className="option" value="10">10</option>
              </select>
              <div className="remove">
               <a href="javascript:void(0)"
                 className="glyphicon glyphicon-trash remove-icon"
                 onClick={this.handleRemove}>
               </a>
              </div>
          </div>
        </div>
        <div>{priceElement}</div>
      </div>
    );
  }
}
