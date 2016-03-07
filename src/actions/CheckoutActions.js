import flux from '../flux';
import Fetcher from 'utils/Fetcher';

class CheckoutActions {

  setClientData(email) {
    Fetcher.getPublicProfile(email).then((response) => {
      const isNewUser = !response.data.userProfileId;
      const orderFormId = flux.getStore('CartStore').getState('orderForm').get('orderForm').orderFormId;

      Fetcher.setClientProfile(orderFormId, email, isNewUser).then(() => {
        this.dispatch(email);
      }).catch(() => {
        this.actions.setClientDataFailed.defer('Ocorreu um erro ao setar os dados do cliente');
      });
    });
  }

  setAnonymousData() {
    const generatedEmail = Date.now().toString() + '@vtex-instore.com';
    this.dispatch(generatedEmail);

    const orderFormId = flux.getStore('CartStore').getState('orderForm').get('orderForm').orderFormId;

    Fetcher.setDefaultClientProfile(orderFormId, generatedEmail).then(() => {
      this.actions.setClientDataSuccess.defer();
    }).catch(() => {
      this.actions.setClientDataFail.defer('Ocorreu um erro ao setar os dados do cliente');
    });
  }

  updateClientDocument(cpf){
    this.dispatch(cpf);
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

  dismissCurrentNotifications(){
    this.dispatch();
  }
}

export default flux.createActions(CheckoutActions);
