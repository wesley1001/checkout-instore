import React, {PropTypes} from 'react';
import {Link} from 'react-router';

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
    products: [],
    installmentOptions: { installments: [] }
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
    const installmentOptions = this.state.cart.get('orderForm').paymentData.installmentOptions;

    CheckoutActions.selectInstallment(1);
    CheckoutActions.selectPayment.defer(payment.id);
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
    const {orderFormId, payment, price, originalPrice, products, installmentOptions} = this.props;
    const {cart, checkout} = this.state;
    const orderForm = cart.get('orderForm');
    let {iconClass, iconLabel, type} = this.composeIconsInfo();

    let selectedInstallmentList, arrowIcon = null;
    let currentPayment = payment.id == checkout.get('selectedPaymentId')

    if (currentPayment) {
      selectedInstallmentList = (
        <div className="installment_list-wrapper">
          <InstallmentList
            price={price}
            originalPrice={originalPrice}
            selectedPaymentId={checkout.get('selectedPaymentId')}
            selectedInstallment={checkout.get('selectedInstallment')}
            orderFormId={orderFormId}
            installmentOptions={orderForm.paymentData.installmentOptions}
          />
        </div>
      );
    } else if (installmentOptions && installmentOptions.installments && installmentOptions.installments.length > 1) {
      arrowIcon = (<i className="arrow text-muted fa fa-caret-down"></i>);
    }

    return (
      <div className="PaymentOption component">
        <div onClick={this.handleClick}>
          <PaymentLabel type={type} iconClass={iconClass} iconLabel={iconLabel}/>
          {arrowIcon}

          <PaymentDetail
            value={installmentOptions.installments.length}
            price={price}
            originalPrice={originalPrice}
          />
        </div>

        {selectedInstallmentList}

      </div>
    );
  }
}
