import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import classNames from 'classnames';

import CartStore from 'stores/CartStore';
import CheckoutActions from 'actions/CheckoutActions';
import CheckoutStore from 'stores/CheckoutStore';
import CartActions from 'actions/CartActions';
import InstallmentList from 'components/InstallmentList';
import PaymentLabel from 'components/PaymentLabel';
import PaymentDetail from 'components/PaymentDetail';

import './index.less';

export default class PaymentOption extends React.Component {
  static propTypes = {
    payment: PropTypes.object
  }

  static defaultProps = {
    orderFormId: '',
    payment: {},
    products: []
  }

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.composeIconsInfo = this.composeIconsInfo.bind(this);

    this.state = {
      cart: CartStore.getState(),
      checkout: CheckoutStore.getState()
    };

    this.onCartChange = this.onCartChange.bind(this);
    this.onCheckoutChange = this.onCheckoutChange.bind(this);
  }

  componentDidMount() {
    CartStore.listen(this.onCartChange);
    CheckoutStore.listen(this.onCheckoutChange);
  }

  componentWillUnmount() {
    CartStore.unlisten(this.onCartChange);
    CheckoutStore.unlisten(this.onCheckoutChange);
  }

  onCartChange(state) {
    this.setState({cart: state});
  }

  onCheckoutChange(state) {
    this.setState({checkout: state});
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
    const {orderFormId, payment, price, products, installmentOptions} = this.props;
    const {cart, checkout} = this.state;
    const orderForm = cart.get('orderForm');
    let {iconClass, iconLabel, type} = this.composeIconsInfo();

    let selectedInstallmentList = null;

    if (payment.id == checkout.get('selectedPaymentId')) {
      selectedInstallmentList = (
        <div>
          <InstallmentList
            price={price}
            selectedPaymentId={checkout.get('selectedPaymentId')}
            selectedInstallment={checkout.get('selectedInstallment')}
            orderFormId={orderFormId}
            installmentOptions={orderForm.paymentData.installmentOptions}
          />
        </div>
      );
    }

    return (
      <div className="PaymentOption component btn btn-default">
        <div onClick={this.handleClick}>
          <PaymentLabel type={type} iconClass={iconClass} iconLabel={iconLabel}/>
          <i className="arrow text-muted fa fa-caret-down"></i>

          <PaymentDetail
            value={installmentOptions.installments.length}
            price={price}
          />
        </div>

        {selectedInstallmentList}

      </div>
    );
  }
}
