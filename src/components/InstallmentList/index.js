import React from 'react';

import InstallmentOption from 'components/InstallmentOption';
import CartActions from 'actions/CartActions';

import './index.less';

export default class InstallmentList extends React.Component {
  static defaultProps = {
    orderFormId: '',
    installmentOptions: [],
    selectedPaymentId: 0,
    selectedInstallment: 0,
    price: 0
  }

  constructor(props) {
    super(props);

    this.handleConfirmPayment = this.handleConfirmPayment.bind(this);
    this.composePaymentOptions = this.composePaymentOptions.bind(this);
  }

  handleConfirmPayment(e) {
    e.preventDefault();
    e.stopPropagation();

    if(this.props.selectedInstallment !== 0) {
      const {selectedPaymentId, selectedInstallment, orderFormId, price} = this.props;

      CartActions.setPayment({
        orderFormId: orderFormId,
        payment: {
          paymentSystem: selectedPaymentId,
          installments: selectedInstallment,
          referenceValue: price * 100
        }
      });
    }
  }

  composePaymentOptions() {
    const {selectedPaymentId, selectedInstallment, installmentOptions, price} = this.props;
    let options = [];
    let installmentArray = [];
    let selectedPayment = installmentOptions.filter(item => item.paymentSystem === selectedPaymentId.toString())[0];

    if(selectedPayment) {
      installmentArray = selectedPayment.installments;
    }

    options = installmentArray.map((installment, index) => {
      return (
        <InstallmentOption
          key={index + 1}
          installments={index + 1}
          price={price}
          selectedInstallment={selectedInstallment}
        />
      );
    });

    return options;
  }

  render() {
    let installmentOptionsList = this.composePaymentOptions();

    return (
      <div className="InstallmentList component">
        <p id="card-installments" className="installments btn-group-vertical">
          {installmentOptionsList}
        </p>

        <p className="confirm">
          <button ref="pinpadCall"
            className="btn btn-success btn-lg btn-block"
            onClick={this.handleConfirmPayment}>
            Confirmar pagamento
          </button>
        </p>
      </div>
    );
  }
}
