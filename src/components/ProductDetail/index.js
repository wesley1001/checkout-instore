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
    const tradePolicy = this.state.vendor.get('store').tradePolicy;
    let product = this.props.product;
    product.quantity = e.target.value;
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
          <div>
            <div className="btn-group">
              <select type ="button" value={product.quantity} className="btn btn-primary dropdown-toggle quantity" data-toggle="dropdown" onChange={this.handleSubmit}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
              </select>
            </div>
          </div>
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
