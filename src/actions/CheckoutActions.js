import flux from '../flux';

import Fetcher from 'utils/Fetcher';

class CheckoutActions {
  setClientData(data) {
    if(!data.orderForm) {
      Fetcher.getOrderForm().then((response) => {
        data.orderForm = response.data.orderForm;
        this.actions.executeSetClientData.defer(data);
      }).catch(() => {
        this.actions.orderFormFailed.defer('Ocorreu um erro ao inicializar o carrinho');
      });
    } else {
      this.actions.executeSetClientData.defer(data);
    }
  }

  executeSetClientData(data) {
    this.dispatch(data.email);

    data.email = data.email || Date.now().toString() + '@vtex-instore.com';

    Fetcher.setClientProfile(data.orderForm, data.email).then(() => {
      this.actions.setClientDataSuccess.defer();
    }).catch(() => {
      this.actions.setClientDataFailed.defer('Ocorreu um erro ao setar os dados do cliente');
    });
  }

  setClientDataSuccess() {
    this.dispatch();
  }

  setClientDataFailed(errorMessage) {
    this.dispatch(errorMessage);
  }

  clearSkuBuffer() {
    this.dispatch();
  }

  findProduct(data) {
    this.dispatch();

    Fetcher.getProduct(data.code, data.sc).then((response) => {
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
