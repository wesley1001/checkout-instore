import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import CheckoutActions from 'actions/CheckoutActions';
import CartActions from 'actions/CartActions';
import PaymentLabel from 'components/PaymentLabel';
import PaymentDetail from 'components/PaymentDetail';

import './index.less';

export default class PaymentOption extends React.Component {
  static propTypes = {
    payment: PropTypes.object
  }

  static defaultProps = {
    payment: {}
  }

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.composeIconsInfo = this.composeIconsInfo.bind(this);
  }

  handleClick(e) {
    const {orderFormId, price, payment} = this.props;

    if(payment.groupName === 'debitDirectSalePaymentGroup') {
      e.preventDefault();
      e.stopPropagation();

      CartActions.setPayment({
        orderFormId: orderFormId,
        payment: {
          paymentSystem: payment.id,
          installments: 1,
          referenceValue: price * 100
        }
      });
    } else {
      CheckoutActions.selectPayment(payment.id);
    }
  }

  composeIconsInfo() {
    const {payment} = this.props;

    if(payment.groupName === 'creditDirectSalePaymentGroup') {
      return {
        iconClass: 'fa-credit-card',
        iconLabel: 'Cartão de crédito',
        type: 'credit'
      };
    }

    if(payment.groupName === 'debitDirectSalePaymentGroup') {
      return {
        iconClass: 'fa-credit-card',
        iconLabel: 'Cartão de débito',
        type: 'debit'
      };
    }
  }

  render() {
    const {price, installmentOptions} = this.props;
    let {iconClass, iconLabel, type} = this.composeIconsInfo();

    return (
      <Link to="/payment" className="PaymentOption component btn btn-default" onClick={this.handleClick}>
        <PaymentLabel type={type} iconClass={iconClass} iconLabel={iconLabel}/>
        <i className="arrow text-muted fa fa-caret-right"></i>

        <PaymentDetail
          value={installmentOptions.installments.length}
          price={price}
        />

      </Link>
    );
  }
}
