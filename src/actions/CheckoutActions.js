import flux from '../flux';

import Fetcher from 'utils/Fetcher';
import requestCache from 'utils/Cache';

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

    Fetcher.setClientProfile(data.orderForm, data.email, data.cpf).then(() => {
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

  findProduct(code) {
    this.dispatch();

    const sku = requestCache.get(code);
    if(!sku) {
      Fetcher.getProduct(code).then((response) => {
        requestCache.put(code, response.data.Id);
        this.actions.readSuccess.defer(response.data.Id);
      }).catch((err) => {
        this.actions.readFailed.defer('Produto não encontrado');
      });
    } else {
      this.actions.readSuccess.defer(sku);
    }
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

  showTypeBarReaderForm() {
    this.dispatch();
  }

  hideTypeBarReaderForm() {
    this.dispatch();
  }


  getOrderGroupData(orderGroup) {
    this.dispatch();
    Fetcher.getOrderGroup(orderGroup).then((response) => {
      this.actions.getOrderGroupDataSuccess(response);
    }, (err) => {
      this.actions.getOrderGroupDataFail(err);
    });
  }



  getOrderGroupDataSuccess(data) {
    this.dispatch(data);
  }

  getOrderGroupDataFail(err) {
    this.dispatch(err);
  }
}

export default flux.createActions(CheckoutActions);
