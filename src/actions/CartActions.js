import flux from '../flux';

import Fetcher from 'utils/Fetcher';

class CartActions {
  getOrderForm() {
    this.dispatch();

    Fetcher.getOrderForm().then((orderForm) => {
      this.actions.orderFormSuccess.defer(orderForm);
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

    Fetcher.addToCart(data.orderFormId, data.item).then((orderForm) => {
      this.actions.orderFormSuccess.defer(orderForm);
    }).catch(() => {
      this.actions.addFailed.defer('Erro ao adicionar produto ao carrinho');
    });
  }

  addFailed(errorMessage) {
    this.dispatch(errorMessage);
  }

  updateCart(data) {
    this.dispatch();

    Fetcher.updateItems(data.orderFormId, data.item).then((orderForm) => {
      this.actions.orderFormSuccess.defer(orderForm);
    }).catch(() => {
      this.actions.updateFailed.defer('Erro ao atualizar produto no carrinho');
    });
  }

  updateFailed(errorMessage) {
    this.dispatch(errorMessage);
  }

  clearCart(orderForm) {
    let items = orderForm.items;
    items = items.map(item => {
      item.quantity = 0;
      return item;
    });

    items.forEach(item => {
      Fetcher.updateItems(orderForm.orderFormId, [item]).then((orderForm) => {
        this.actions.orderFormSuccess.defer(orderForm);
      });
    });
  }

  setShipping(data) {
    this.dispatch();

    Fetcher.setShipping(data.orderFormId, data.address).then(() => {
      this.actions.setCheckedIn.defer(data.orderFormId);
    }).catch(() => {
      this.actions.requestFailed.defer('Ocorreu um erro ao setar os dados da loja');
    });
  }

  setCheckedIn(orderFormId) {
    this.dispatch();

    Fetcher.setCheckedIn(orderFormId).then((orderForm) => {
      this.actions.orderFormSuccess.defer(orderForm);
    }).catch(() => {
      this.actions.requestFailed.defer('Ocorreu um erro ao setar os dados da loja');
    });
  }

  setPayment(data) {
    this.dispatch();

    Fetcher.setPayment(data.orderFormId, data.payment).then(() => {
      this.actions.startTransaction.defer(data);
    }).catch(() => {
      this.actions.requestFailed.defer('Ocorreu um erro ao setar a opção de pagamento');
    });
  }

  startTransaction(data) {
    this.dispatch();

    Fetcher.startTransaction(data.orderFormId, data.payment.referenceValue).then((orderForm) => {
      this.actions.transactionSuccess.defer(orderForm);
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
}

export default flux.createActions(CartActions);
