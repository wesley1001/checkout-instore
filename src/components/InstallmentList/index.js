import React from 'react';

import InstallmentOption from 'components/InstallmentOption';
import CartActions from 'actions/CartActions';
import CartStore from 'stores/CartStore';
import CheckoutActions from 'actions/CheckoutActions';
import CheckoutStore from 'stores/CheckoutStore';
import ProductHelper from 'utils/ProductHelper';

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
      checkout: CheckoutStore.getState(),
      cart: CartStore.getState(),
      isCpfValid: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.onCheckoutChange = this.onCheckoutChange.bind(this);
    this.onCartChange = this.onCartChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleConfirmPayment = this.handleConfirmPayment.bind(this);
    this.composePaymentOptions = this.composePaymentOptions.bind(this);
  }

  componentDidMount() {
    CheckoutStore.listen(this.onCheckoutChange);
    CartStore.listen(this.onCartChange);
  }

  componentWillUnmount() {
    CheckoutStore.unlisten(this.onCheckoutChange);
    CartStore.unlisten(this.onCartChange);
  }

  onCheckoutChange(state) {
    this.setState({checkout: state});
  }

  onCartChange(state) {
    this.setState({cart: state});
  }

  handleChange(e) {
    if(e.target.value.length === 15 ) return;

    if(this.state.cart.get('couponDocument').length < e.target.value.length && (e.target.value.length === 3 || e.target.value.length === 7)) {
      CartActions.updateCouponDocument(e.target.value + '.');
    } else if(this.state.cart.get('couponDocument').length < e.target.value.length && e.target.value.length === 11) {
      CartActions.updateCouponDocument(e.target.value + '-');
    } else {
      CartActions.updateCouponDocument(e.target.value);
    }
  }

  handleKeyDown(e) {
    if(e.keyCode !== 8 && e.keyCode < 48 || e.keyCode > 57) {
      e.preventDefault();
    }
  }

  handleKeyUp(e) {
    let cpf = e.target.value;

    if(cpf.length === 14) {
      cpf = cpf.replace('.','').replace('.','').replace('-','');
      this.setState({ isCpfValid: ProductHelper.validateCPF(cpf) });
    } else if(cpf.length === 0) {
      this.setState({ isCpfValid: true });
    } else {
      this.setState({ isCpfValid: false });
    }
  }

  handleConfirmPayment(e) {
    e.preventDefault();
    e.stopPropagation();

    CartActions.setClientCouponDocumentId.defer(this.state.cart.get('couponDocument'));

    if(this.props.selectedInstallment !== 0) {
      const {selectedPaymentId, selectedInstallment, orderFormId, price} = this.props;

      CartActions.setPayment.defer({
        orderFormId: orderFormId,
        payment: {
          paymentSystem: selectedPaymentId,
          installments: selectedInstallment || 1,
          referenceValue: price * 100
        }
      });
    }
  }

  composePaymentOptions() {
    const {selectedPaymentId, selectedInstallment, installmentOptions, price} = this.props;
    let options = [];
    let installmentArray = [];
    let selectedPayment = ProductHelper.getSelectedPayment(installmentOptions, selectedPaymentId);

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
    const { selectedInstallment, installmentOptions, selectedPaymentId } = this.props;
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
              value={this.state.cart.get('couponDocument')}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              onKeyUp={this.handleKeyUp}
            />
            { !this.state.isCpfValid && this.state.cart.get('couponDocument').length === 14 && <small>CPF Inválido</small> }
          </p>
          <p className="confirm">
            <button ref="pinpadCall"
              className="btn btn-success btn-lg btn-block"
              onClick={this.handleConfirmPayment}
              disabled={!this.state.isCpfValid}>
              { this.state.cart.get('couponDocument').length > 0 ? 'Confirmar pagamento' : 'Confirmar sem CPF' }
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
          { installmentOptionsList }
        </p>

        {confirmButton}
      </div>
    );
  }
}
