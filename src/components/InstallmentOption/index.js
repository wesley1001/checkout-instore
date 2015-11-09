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

  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();

    CheckoutActions.selectInstallment(this.props.installments);
  }

  checkSelectedInstallment() {
    const {installments, selectedInstallment} = this.props;

    if(selectedInstallment !== installments) {
      return 'InstallmentOption component btn btn-default';
    }

    return 'InstallmentOption component btn btn-default active';
  }

  render() {
    const {installments, discount, price} = this.props;
    let selectedInstallment = this.checkSelectedInstallment();

    return (
      <button className={selectedInstallment} value={installments} onClick={this.handleClick}>
        <big><strong>{installments === 1 ? 'À vista' : installments + 'x'}</strong></big>

        
        <small>
          {installments === 1 ? '' : ' de'}
          <br/>        
          R$ {ProductHelper.formatPrice(((1 - discount) * price) / installments)}
        </small>
      </button>
    );
  }
}
