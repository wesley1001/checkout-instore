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
    const {price} = this.props;
    let installments = this.composeInstallments();

    return (
      <div className="PaymentDetail component text-muted">
        <strong><small className="bold description">R$ {ProductHelper.formatPrice(price)}</small></strong>
        <small>&nbsp;{installments}</small>
      </div>
    );
  }
}
