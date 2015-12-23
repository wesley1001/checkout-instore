import React, {PropTypes} from 'react';

import ProductHelper from 'utils/ProductHelper';

import './index.less';

export default class PaymentDetail extends React.Component {
  static propTypes = {
    value: PropTypes.number,
    price: PropTypes.number
  }

  static defaultProps = {
    value: 1,
    price: 0
  }

  constructor(props) {
    super(props);

    this.composeInstallments = this.composeInstallments.bind(this);
  }

  composeInstallments() {
    const {value} = this.props;

    if (value === 1) {
      return (<span>à vista</span>);
    }

    return (<span>em até {value}x</span>);
  }

  render() {
    const {price, originalPrice} = this.props;
    let installments = this.composeInstallments();

    let totalPriceElement = () =>{
      if(price !== originalPrice) {
        return (
          <div>
            <span className="currency"> R$ </span> <small className="description"> <span className="discount-price">{ProductHelper.formatPrice(originalPrice)}</span> R$ {ProductHelper.formatPrice(price)}</small>
          </div>
        );
      }
      else {
        return (
          <small className="bold description">R$ {ProductHelper.formatPrice(price)}</small>
        );
      }
    }();

    return (
      <div className="PaymentDetail component text-muted">
        <strong>{totalPriceElement}</strong>
        <small>&nbsp;{installments}</small>
      </div>
    );
  }
}
