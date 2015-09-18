import React from 'react';
import {Link} from 'react-router';

import './index.less';

import InstallmentList from 'components/InstallmentList';
import CheckoutActions from 'actions/CheckoutActions';
import ProductHelper from 'utils/ProductHelper';

export default class PaymentInfo extends React.Component {
  static defaultProps = {
    orderFormId: '',
    paymentData: {},
    products: [],
    checkout: {}
  }

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    CheckoutActions.deselectInstallment();
  }

  render() {
    const {orderFormId, paymentData, products, checkout} = this.props;
    let productTotal = ProductHelper.calculateTotalPrice(products);

    return (
      <section className="PaymentInfo component">
        <header>
          <h4 className="title main-title">
            <span className="main-title-name">Parcelamento</span>
            <span className="main-title-border"></span>
          </h4>
        </header>

        <InstallmentList price={productTotal}
          selectedPaymentId={checkout.get('selectedPaymentId')}
          selectedInstallment={checkout.get('selectedInstallment')}
          orderFormId={orderFormId}
          installmentOptions={paymentData.installmentOptions}
        />
        <p><Link to="instore_cart" onClick={this.handleClick}>Voltar para Lista de itens</Link></p>
      </section>
    );
  }
}
