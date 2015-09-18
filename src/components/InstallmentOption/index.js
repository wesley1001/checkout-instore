import React from 'react';

import CheckoutActions from 'actions/CheckoutActions';
import ProductHelper from 'utils/ProductHelper';

import './index.less';

export default class InstallmentOption extends React.Component {
  static defaultProps = {
    discount: 0,
    installments: 1,
    price: 0
  }

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.checkSelectedInstallment = this.checkSelectedInstallment.bind(this);
  }

  handleClick() {
    CheckoutActions.selectInstallment(this.props.installments);
  }

  checkSelectedInstallment() {
    const {installments, selectedInstallment} = this.props;

    if(selectedInstallment !== installments) {
      return '';
    }

    return (
      <i className="fa fa-check icon"></i>
    );
  }

  render() {
    const {installments, discount, price} = this.props;
    let selectInstallment = this.checkSelectedInstallment();

    return (
      <button className="InstallmentOption component btn btn-default" value={installments} onClick={this.handleClick}>
        {installments === 1 ? 'A vista: ' : installments + 'x de '}
        R$ {ProductHelper.formatPrice(((1 - discount) * price) / installments)}
        { selectInstallment }
      </button>
    );
  }
}
