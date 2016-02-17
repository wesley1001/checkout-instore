import flux from '../flux';

import Fetcher from 'utils/Fetcher';
import requestCache from 'utils/Cache';
import CheckoutStore from 'stores/CheckoutStore';
import CartStore from 'stores/CartStore';
import VendorStore from 'stores/VendorStore';

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

    const orderForm = CartStore.getState('orderForm').get('orderForm');
    data.orderFormId = orderForm.orderFormId;
    const vendor = VendorStore.getState('user').get('user');
    data.vendor = vendor.id;
    const store = VendorStore.getState('store').get('store');
    data.tradePolicy = store.tradePolicy;


    Fetcher.addToCart(data.orderFormId, data.item, data.vendor, data.tradePolicy).then(() => {
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

    const orderForm = CartStore.getState('orderForm').get('orderForm');
    data.orderFormId = orderForm.orderFormId;
    const store = VendorStore.getState('store').get('store');
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

    const orderForm = CartStore.getState('orderForm').get('orderForm');

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

  setShipping(data) {
    this.dispatch();

    const orderForm = CartStore.getState('orderForm').get('orderForm');
    data.orderFormId = orderForm.orderFormId;

    Fetcher.setShipping(data.orderFormId, data.address).then(() => {
      this.actions.checkedIn.defer();
    }).catch(() => {
      this.actions.requestFailed.defer('Ocorreu um erro ao definir os dados de entrega');
    });
  }

  checkedIn() {
    this.dispatch();

    const orderForm = CartStore.getState('orderForm').get('orderForm');
    const store = VendorStore.getState('store').get('store');

    Fetcher.checkedIn(orderForm.orderFormId, true, store.id).then((response) => {
      this.actions.orderFormSuccess.defer(response.data);
    }).catch(() => {
      this.actions.requestFailed.defer('Ocorreu um erro ao fazer o checkin da loja');
    });
  }

  setDefaultPayment(data) {
    this.dispatch();

    const orderForm = CartStore.getState('orderForm').get('orderForm');
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

    const orderForm = CartStore.getState('orderForm').get('orderForm');
    data.orderFormId = orderForm.orderFormId;

    Fetcher.setPayment(data.orderFormId, data.payment).then(() => {
      this.actions.startTransaction.defer(data);
    }).catch(() => {
      this.actions.requestFailed.defer('Ocorreu um erro ao definir a opção de pagamento');
    });
  }

  startTransaction(data) {
    this.dispatch();

    const orderForm = CartStore.getState('orderForm').get('orderForm');
    data.orderFormId = orderForm.orderFormId;

    Fetcher.startTransaction(data.orderFormId, data.payment.referenceValue).then((response) => {
      this.actions.transactionSuccess.defer(response.data);
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
}

export default flux.createActions(CartActions);
