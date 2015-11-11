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
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleConfirmPayment = this.handleConfirmPayment.bind(this);
    this.composePaymentOptions = this.composePaymentOptions.bind(this);
  }

  handleChange(e) {
    if(e.target.value.length === 15 ) return;

    if(this.state.cpf.length < e.target.value.length && (e.target.value.length === 3 || e.target.value.length === 7)) {
      this.setState({cpf: e.target.value + '.'});
    } else if(this.state.cpf.length < e.target.value.length && e.target.value.length === 11) {
      this.setState({cpf: e.target.value + '-'});
    } else {
      this.setState({cpf: e.target.value});
    }
  }

  handleBlur() {
    if(this.state.cpf.length === 14) {
      console.log('aeeeeemanolo')
    }
  }

  handleKeyDown(e) {
    if(e.keyCode !== 8 && e.keyCode < 48 || e.keyCode > 57) {
      e.preventDefault();
    }
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
              onBlur={this.handleBlur}
              onKeyDown={this.handleKeyDown}
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
