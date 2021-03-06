import flux from '../flux';
import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';

import CheckoutActions from 'actions/CheckoutActions';

@immutable
class CheckoutStore {
  constructor() {
    this.bindActions(CheckoutActions);

    this.state = Immutable.Map({
      customerEmail: '',
      customerDocument: '',
      selectedPaymentId: 0,
      selectedInstallment: 0,
      sku: '',
      seller: 1,
      incrementingProduct: '',
      error: '',
      readingBarcode: false,
      typingBarcode: false,
      typingEmail: false,
      loading: false,
      orderGroup: undefined,
      orderPlacedError: false
    });
  }

  onUpdateClientDocument(cpf){
    this.setState(this.state.set('customerDocument', cpf));
  }

  onSetClientData() {
    this.setState(this.state.set('error', ''));
    this.setState(this.state.set('loading', true));
  }

  onSetAnonymousData(){
    this.setState(this.state.set('loading', true));
  }

  onSetClientDataSuccess(email){
    if(email){
      this.setState(this.state.set('customerEmail', email));
    }
    this.setState(this.state.set('loading', false));
  }

  onSetClientDataFailed(errorMessage) {
    this.setState(this.state.set('error', errorMessage));
  }

  onClearSkuBuffer() {
    this.setState(this.state.set('sku', ''));
  }

  onFindProduct() {
    this.setState(this.state.set('readingBarcode', true));
    this.setState(this.state.set('loading', true));
    this.setState(this.state.set('error', ''));
  }

  onReadSuccess(sku) {
    this.setState(this.state.set('sku', sku));
    this.setState(this.state.set('readingBarcode', false));
    this.setState(this.state.set('loading', false));
  }

  onReadFailed(errorMessage) {
    this.setState(this.state.set('sku', ''));
    this.setState(this.state.set('readingBarcode', false));
    this.setState(this.state.set('loading', false));
    this.setState(this.state.set('error', errorMessage));
  }

  onSelectPayment(id) {
    this.setState(this.state.set('selectedPaymentId', id));
  }

  onSelectInstallment(installment) {
    this.setState(this.state.set('selectedInstallment', installment));
  }

  onDeselectInstallment() {
    this.setState(this.state.set('selectedInstallment', 0));
  }

  onShowTypeBarReaderForm() {
    this.setState(this.state.set('typingBarcode', true));
  }

  onHideTypeBarReaderForm() {
    this.setState(this.state.set('typingBarcode', false));
  }

  onShowTypeEmailForm() {
    this.setState(this.state.set('typingEmail', true));
  }

  onHideTypeEmailForm() {
    this.setState(this.state.set('typingEmail', false));
  }

  onGetOrderGroupData() {
    this.setState(this.state.set('orderGroup', undefined));
    this.setState(this.state.set('orderPlacedError', false));
    this.setState(this.state.set('error', undefined));
    this.setState(this.state.set('loading', true));
  }
  onGetOrderGroupDataSuccess(data) {
    this.setState(this.state.set('orderGroup', data));
    this.setState(this.state.set('orderPlacedError', false));
    this.setState(this.state.set('error', undefined));
    this.setState(this.state.set('loading', false));
  }

  onGetOrderGroupDataFail(err) {
    this.setState(this.state.set('orderGroup', undefined));
    this.setState(this.state.set('orderPlacedError', true));
    if(err.status == 403){
      this.setState(this.state.set('error', 'Acesso Negado'));
    }
    else if(err.status == 500){
      this.setState(this.state.set('error', 'Houve um erro ao carregar a página.'));
    }
    else{
      this.setState(this.state.set('error', 'Houve um erro ao carregar a página. \n HTTP Status: ' + err.status));
    }
    this.setState(this.state.set('loading', false));
  }

  onDismissCurrentNotifications(){
    this.setState(this.state.set('error', ''));
  }
}

export default flux.createStore(CheckoutStore, 'CheckoutStore');
