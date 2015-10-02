import flux from '../flux';

import Fetcher from 'utils/Fetcher';

class CheckoutActions {
  addCustomerEmail(data) {
    this.dispatch(data.email);

    data.email = data.email || Date.now().toString() + '@vtex-instore.com';

    Fetcher.setClientProfile(data.orderForm, data.email).then(() => {
      this.actions.setEmailSuccess.defer();
    }).catch(() => {
      this.actions.setEmailFailed.defer('Ocorreu um erro ao setar os dados do cliente');
    });
  }

  setEmailSuccess() {
    this.dispatch();
  }

  setEmailFailed(errorMessage) {
    this.dispatch(errorMessage);
  }

  clearSkuBuffer() {
    this.dispatch();
  }

  findProduct(code) {
    this.dispatch();

    Fetcher.getProduct(code).then((response) => {
      this.actions.readSuccess.defer(response.data.Id);
    }).catch(() => {
      this.actions.readFailed.defer('Produto não encontrado');
    });
  }

  readSuccess(skuId) {
    this.dispatch(skuId);
  }

  readFailed(errorMessage) {
    this.dispatch(errorMessage);
  }

  selectPayment(id) {
    this.dispatch(id);
  }

  selectInstallment(installments) {
    this.dispatch(installments);
  }

  deselectInstallment() {
    this.dispatch();
  }
}

export default flux.createActions(CheckoutActions);
