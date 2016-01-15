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
      showInput: false,
      productQuantity: this.props.product.quantity
    };

    this.handleRemove = this.handleRemove.bind(this);
    this.handleShowOptions = this.handleShowOptions.bind(this);
    this.handleShowInput = this.handleShowInput.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.subtractProduct = this.subtractProduct.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    this.setState({productQuantity: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
console.log('lala');
    const tradePolicy = this.state.vendor.get('store').tradePolicy;
    let product = this.props.product;
    product.quantity = this.state.productQuantity;
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
  handleShowInput(e){
    e.preventDefault();

    this.setState({showInput : true});
  }

  addProduct(){
    const tradePolicy = this.state.vendor.get('store').tradePolicy;
    let product = this.props.product;
    product.quantity += 1;
    this.setState({productQuantity: product.quantity});
    product.index = this.props.index;

    CartActions.updateCart({
      orderFormId: this.props.orderFormId,
      item: [product],
      tradePolicy: tradePolicy
    });
  }

  subtractProduct(){
    const tradePolicy = this.state.vendor.get('store').tradePolicy;
    let product = this.props.product;
    product.quantity -= 1;
    this.setState({productQuantity: product.quantity});
    product.index = this.props.index;

    CartActions.updateCart({
      orderFormId: this.props.orderFormId,
      item: [product],
      tradePolicy: tradePolicy
    });
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
          {priceElement}
        </div>
        <div className="options">
          <span className="dropdown btn btn-xs btn-default">
            <a href="javascript:void(0)"
              className="glyphicon glyphicon-option-horizontal"
              onClick={this.handleShowOptions}>
            </a>
          </span>
            {this.state.showOptions ?
            <div className="menu">
              <div className="remove list">
                <div href="javascript:void(0)"
                className="remove-text"
                onClick={this.handleRemove}> Remover produto
                </div>
              </div>
              <div className="extra list">
                <div> Outras funções </div>
              </div>
            </div> : ' ' }
            <div>
              {this.state.showInput ?
              <span className="form-inline form-quantity">
                <span className="form-group"><i className="fa fa-minus-circle fa-lg" onClick={this.subtractProduct}></i></span>
                <span className="form-group"><input className="product-quantity form-control input-sm text-center" value={product.quantity}></input></span>
                <span className="form-group"><i className="fa fa-plus-circle fa-lg" onClick={this.addProduct}></i></span>
              </span> :
              <span className="btn-xs quantity" onClick={this.handleShowInput}>{product.quantity}</span>
              }
            </div>
        </div>
      </div>
    );
  }
}
