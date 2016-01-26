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

  updateClientDocument(cpf){
    this.dispatch(cpf);
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

  findProduct(ean) {
    this.dispatch();

    Fetcher.getSKUByEAN(ean).then((sku) => {
      this.actions.readSuccess.defer(sku);
    }).catch((err) => {
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

  showTypeBarReaderForm() {
    this.dispatch();
  }

  hideTypeBarReaderForm() {
    this.dispatch();
  }

  showTypeEmailForm() {
    this.dispatch();
  }

  hideTypeEmailForm() {
    this.dispatch();
  }

  getOrderGroupData(orderGroup) {
    this.dispatch();
    Fetcher.getOrderGroup(orderGroup).then((response) => {
      if(response.length === 0) {
        this.actions.getOrderGroupDataFail.defer({err: 'order not found'});
      }
      else {
        this.actions.getOrderGroupDataSuccess.defer(response[0]);
      }
    }, (err) => {
      console.log('err: ', err);
      this.actions.getOrderGroupDataFail.defer(err);
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
