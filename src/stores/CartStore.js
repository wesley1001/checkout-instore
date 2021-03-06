import flux from '../flux';
import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';
import CartActions from 'actions/CartActions';
import MessageUtils from 'utils/MessageUtils';

@immutable
class CartStore {
  constructor() {
    this.bindActions(CartActions);

    this.state = Immutable.Map({
      orderForm: undefined,

      couponDocument: '',

      loading: false,

      error: '',
      message: '',

      paymentObj: {},
      paymentUrl: '',
      gatewayUrl: ''
    });
  }

  onGetOrderForm() {
    this.setState(this.state.set('error', ''));
    this.setState(this.state.set('loading', true));
  }

  onOrderFormSuccess(orderForm) {
    this.setState(this.state.set('orderForm', orderForm));
    this.setState(this.state.set('loading', false));
    this.setState(this.state.set('message', MessageUtils.getFirstMessageText(orderForm)));
  }

  onOrderFormFailed(errorMessage) {
    this.setState(this.state.set('orderForm', undefined));
    this.setState(this.state.set('loading', false));
    this.setState(this.state.set('error', errorMessage));
    this.setState(this.state.set('message', ''));
  }

  onAddToCart() {
    this.setState(this.state.set('loading', true));
    this.setState(this.state.set('error', ''));
  }

  onAddFailed(errorMessage) {
    this.setState(this.state.set('loading', false));
    this.setState(this.state.set('error', errorMessage));
  }

  onUpdateCart() {
    this.setState(this.state.set('loading', true));
    this.setState(this.state.set('error', ''));
  }

  onUpdateFailed(errorMessage) {
    this.setState(this.state.set('loading', false));
    this.setState(this.state.set('error', errorMessage));
  }

  onExecuteSetCheckIn() {
    this.setState(this.state.set('error', ''));
  }

  onSetPayment() {
    this.setState(this.state.set('loading', true));
    this.setState(this.state.set('error', ''));
  }

  onStartTransaction() {
    this.setState(this.state.set('loading', true));
    this.setState(this.state.set('error', ''));
  }

  onTransactionSuccess(orderForm) {
    const selectedPaymentId = orderForm.paymentData.payments[0].paymentSystem;
    const selectedPayment = orderForm.paymentData.paymentSystems.filter(item => item.id.toString() === selectedPaymentId.toString())[0];
    const merchantName = (orderForm.merchantTransactions && orderForm.merchantTransactions[0]) ? orderForm.merchantTransactions[0].merchantName : null;

    const data = {
      paymentsArray: [{
        paymentSystem: selectedPaymentId,
        paymentSystemName: selectedPayment.name,
        group: selectedPayment.groupName,
        installments: orderForm.paymentData.payments[0].installments,
        installmentsInterestRate:0,
        installmentsValue: orderForm.paymentData.payments[0].merchantSellerPayments[0].installmentValue,
        value: orderForm.paymentData.payments[0].value,
        referenceValue: orderForm.paymentData.payments[0].referenceValue,
        id: merchantName,
        interestRate: 0,
        installmentValue: orderForm.paymentData.payments[0].merchantSellerPayments[0].installmentValue,
        transaction: {
          id: orderForm.merchantTransactions[0].transactionId,
          merchantName: merchantName
        },
        currencyCode: 'BRL'
      }],
      callbackUrl: orderForm.gatewayCallbackTemplatePath
    };

    this.setState(this.state.set('paymentObj', data));
    this.setState(this.state.set('paymentUrl', orderForm.receiverUri));
    this.setState(this.state.set('gatewayUrl', orderForm.gatewayCallbackTemplatePath));
  }

  onRequestFailed(errorMessage) {
    this.setState(this.state.set('loading', false));
    this.setState(this.state.set('error', errorMessage));
  }

  onDismissCurrentNotifications(){
    this.setState(this.state.set('error', ''));
    this.setState(this.state.set('message', ''));
  }

  onCheckIn() {
    this.setState(this.state.set('error', ''));
    this.setState(this.state.set('loading', true));
  }

  onSetVendor() {
    this.setState(this.state.set('error', ''));
    this.setState(this.state.set('loading', true));
  }

  onUpdateCouponDocument(cpf){
    this.setState(this.state.set('couponDocument', cpf));
  }
}

export default flux.createStore(CartStore, 'CartStore');
