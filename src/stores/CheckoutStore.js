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
      selectedPaymentId: 0,
      selectedInstallment: 0,
      sku: '',
      seller: 1,
      incrementingProduct: '',
      error: '',
      readingBarcode: false,
      typingBarcode: false,
      typingEmail: false,
      loading: false
    });
  }

  onExecuteSetClientData(email) {
    this.setState(this.state.set('customerEmail', email));
    this.setState(this.state.set('error', ''));
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
    console.log('STORE BEFORE: ',this.state.get('typingEmail'));
    this.setState(this.state.set('typingEmail', true));
    console.log('STORE AFTER: ',this.state.get('typingEmail'));
  }

  onHideTypeEmailForm() {
    this.setState(this.state.set('typingEmail', false));
  }
}

export default flux.createStore(CheckoutStore, 'CheckoutStore');
