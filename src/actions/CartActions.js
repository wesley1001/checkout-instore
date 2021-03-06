import flux from '../flux';

import Fetcher from 'utils/Fetcher';
import requestCache from 'utils/Cache';

class CartActions {
  getOrderForm() {
    this.dispatch();
    Fetcher.getOrderForm().then((response) => {
      this.actions.orderFormSuccess.defer(response.data);
    }).catch(() => {
      this.actions.orderFormFailed.defer('Ocorreu um erro ao inicializar o carrinho');
    });
  }

  orderFormSuccess(orderForm) {
    this.dispatch(orderForm);
  }

  orderFormFailed(errorMessage) {
    this.dispatch(errorMessage);
  }

  addToCart(data) {
    this.dispatch();

    const orderForm = flux.getStore('CartStore').getState('orderForm').get('orderForm');
    data.orderFormId = orderForm.orderFormId;
    const store = flux.getStore('VendorStore').getState('store').get('store');
    data.tradePolicy = store.tradePolicy;

    Fetcher.addToCart(data.orderFormId, data.item, data.tradePolicy).then((response) => {
      this.actions.orderFormSuccess.defer(response.data);
    }).catch(() => {
      this.actions.addFailed.defer('Erro ao adicionar produto ao carrinho');
    });
  }

  executeAddToCart(data) {
    this.dispatch();
  }

  addFailed(errorMessage) {
    this.dispatch(errorMessage);
  }

  updateCart(data) {
    this.dispatch();

    const orderForm = flux.getStore('CartStore').getState('orderForm').get('orderForm');
    data.orderFormId = orderForm.orderFormId;
    const store = flux.getStore('VendorStore').getState('store').get('store');
    data.tradePolicy = store.tradePolicy;

    Fetcher.updateItems(data.orderFormId, data.item, data.tradePolicy).then((response) => {
      this.actions.orderFormSuccess.defer(response.data);
    }).catch(() => {
      this.actions.updateFailed.defer('Erro ao atualizar produto no carrinho');
    });
  }

  updateFailed(errorMessage) {
    this.dispatch(errorMessage);
  }

  clearCart() {
    requestCache.clear();

    const orderForm = flux.getStore('CartStore').getState('orderForm').get('orderForm');

    let items = orderForm.items || [];
    items = items.map(item => {
      item.quantity = 0;
      return item;
    });

    ///TODO - REVER ESSE LOOP
    items.forEach(item => {
      Fetcher.updateItems(orderForm.orderFormId, [item]).then((response) => {
        this.actions.orderFormSuccess.defer(response.data);
      });
    });
  }

  checkIn() {
    this.dispatch();
    const orderForm = flux.getStore('CartStore').getState('orderForm').get('orderForm');
    const store = flux.getStore('VendorStore').getState('store').get('store');

    Fetcher.checkIn(orderForm.orderFormId, true, store.id).then((response) => {
      this.actions.orderFormSuccess.defer(response.data);
    }).catch(() => {
      this.actions.requestFailed.defer('Ocorreu um erro ao fazer o checkin da loja');
    }).catch(() => {
    });
  }

  setDefaultPayment(data) {
    this.dispatch();

    const orderForm = flux.getStore('CartStore').getState('orderForm').get('orderForm');
    let defaultPayment = _.find(orderForm.paymentData.installmentOptions, (payment) => payment.paymentSystem == 45 || payment.paymentSystem == 44);

    if(!defaultPayment || defaultPayment.installments.length == 0) {
      defaultPayment = _.find(orderForm.paymentData.paymentSystems, (payment) => payment.id == 45 || payment.id == 44);

      const paymentObject = {
        paymentSystem: defaultPayment.id,
        referenceValue: orderForm.value
      }
      Fetcher.setPayment(orderForm.orderFormId, paymentObject).then((response) => {
        this.actions.orderFormSuccess.defer(response.data);
        this.actions.setDefaultPaymentSuccess.defer(response.data);
      }).catch((err) => {
        this.actions.setDefaultPaymentFail.defer(err);
        this.actions.requestFailed.defer('Ocorreu um erro ao definir a opção de pagamento');
      });
    }
  }

  setDefaultPaymentSuccess(orderForm) {
    this.dispatch(orderForm);
  }

  setDefaultPaymentFail(errorMessage) {
    this.dispatch(errorMessage);
  }

  setPayment(data) {
    this.dispatch();

    const orderForm = flux.getStore('CartStore').getState('orderForm').get('orderForm');
    data.orderFormId = orderForm.orderFormId;

    Fetcher.setPayment(data.orderFormId, data.payment).then(() => {
      this.actions.startTransaction.defer(data);
    }).catch(() => {
      this.actions.requestFailed.defer('Ocorreu um erro ao definir a opção de pagamento');
    });
  }

  startTransaction(data) {
    this.dispatch();

    const orderForm = flux.getStore('CartStore').getState('orderForm').get('orderForm');
    data.orderFormId = orderForm.orderFormId;

    Fetcher.startTransaction(data.orderFormId, data.payment.referenceValue).then((response) => {
      const fatalMessages = response.data.messages.filter((item) => {
        return (item.status) ? item.status.toString() === 'fatal' : false;
      });

      if(fatalMessages.count > 0){
        this.actions.requestFailed.defer(data.messages[0].text);
      }
      else{
        this.actions.transactionSuccess.defer(response.data);
      }
    }).catch(() => {
      this.actions.requestFailed.defer('Ocorreu um erro ao iniciar a transação');
    });
  }

  transactionSuccess(orderForm) {
    this.dispatch(orderForm);
  }

  requestFailed(errorMessage) {
    this.dispatch(errorMessage);
  }

  dismissCurrentNotifications(){
    this.dispatch();
  }

  executeRequest(){
    this.dispatch();
  }

  setVendor() {
    this.dispatch();
    const orderFormId = flux.getStore('CartStore').getState('orderForm').get('orderForm').orderFormId;
    const userData = flux.getStore('VendorStore').getState('vendor').get('user');

    const marketingData = {
      utmSource: userData.id,
      utmiCampaign: userData.store
    };

    Fetcher.setMarketingData(orderFormId, marketingData).then((response) => {
      this.actions.orderFormSuccess.defer(response.data);
    }).catch(() => {
      this.actions.requestFailed.defer('Ocorreu um erro ao atribuir a venda ao vendedor');
    });
  }

  setClientCouponDocumentId(cpf) {
    this.dispatch();
    const orderFormId = flux.getStore('CartStore').getState('orderForm').get('orderForm').orderFormId;
    const userData = flux.getStore('VendorStore').getState('vendor').get('user');

    const marketingData = {
      utmSource: userData.id,
      utmiCampaign: userData.store,
      utmCampaign:cpf
    };

    Fetcher.setMarketingData(orderFormId, marketingData).then((response) => {
      this.actions.orderFormSuccess.defer(response.data);
    }).catch(() => {
      this.actions.requestFailed.defer('Ocorreu um erro ao atribuir o cpf na nota');
    });
  }


  updateCouponDocument(cpf) {
    this.dispatch(cpf);
  }
}

export default flux.createActions(CartActions);
