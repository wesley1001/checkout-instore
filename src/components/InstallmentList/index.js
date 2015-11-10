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

    this.state = {
      cpf: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleConfirmPayment = this.handleConfirmPayment.bind(this);
    this.composePaymentOptions = this.composePaymentOptions.bind(this);
  }

  handleChange(e) {
    this.setState({cpf: e.target.value});
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
    const {selectedInstallment} = this.props;
    let installmentOptionsList = this.composePaymentOptions();
    let confirmButton;

    if (selectedInstallment) {
      confirmButton = (
        <form>
          <p className="form-group">
            <label htmlFor="cpf">CPF na nota</label>
            <input
              id="cpf"
              className="form-control"
              type="tel"
              placeholder="999.999.999-99"
              value={this.state.cpf}
              onChange={this.handleChange}
              />
          </p>
          <p className="confirm">
            <button ref="pinpadCall"
              className="btn btn-success btn-lg btn-block"
              onClick={this.handleConfirmPayment}>
              { this.state.cpf.length > 0 ? 'Confirmar pagamento' : 'Confirmar sem CPF' }
            </button>
          </p>
        </form>
      )
    } else {
      confirmButton = null;
    }

    return (
      <div className="InstallmentList component">
        <p id="card-installments" className="installments">
          {installmentOptionsList}
        </p>

        {confirmButton}
      </div>
    );
  }
}
