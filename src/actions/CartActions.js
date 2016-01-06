import flux from '../flux';

import Fetcher from 'utils/Fetcher';
import requestCache from 'utils/Cache';

class CartActions {
  getOrderForm() {
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
    if(!data.orderFormId) {
      Fetcher.getOrderForm().then((response) => {
        data.orderFormId = response.data.orderFormId;
        this.actions.orderFormSuccess.defer(response.data);
        this.actions.executeAddToCart.defer(data);
      }).catch(() => {
        this.actions.orderFormFailed.defer('Ocorreu um erro ao inicializar o carrinho');
      });
    } else {
      this.actions.executeAddToCart.defer(data);
    }
  }

  executeAddToCart(data) {
    this.dispatch();
    Fetcher.addToCart(data.orderFormId, data.item, data.vendor, data.tradePolicy).then(() => {
      this.actions.setDefaultPayment.defer();
    }).catch(() => {
      this.actions.addFailed.defer('Erro ao adicionar produto ao carrinho');
    });
  }

  addFailed(errorMessage) {
    this.dispatch(errorMessage);
  }

  updateCart(data) {
    if(!data.orderFormId) {
      Fetcher.getOrderForm().then((response) => {
        data.orderFormId = response.data.orderFormId;
        this.actions.orderFormSuccess.defer(response.data);
        this.actions.executeUpdateCart.defer(data);
      }).catch(() => {
        this.actions.orderFormFailed.defer('Ocorreu um erro ao inicializar o carrinho');
      });
    } else {
      this.actions.executeUpdateCart.defer(data);
    }
  }

  executeUpdateCart(data) {
    this.dispatch();

    Fetcher.updateItems(data.orderFormId, data.item, data.tradePolicy).then((response) => {
      this.actions.orderFormSuccess.defer(response.data);
    }).catch(() => {
      this.actions.updateFailed.defer('Erro ao atualizar produto no carrinho');
    });
  }

  updateFailed(errorMessage) {
    this.dispatch(errorMessage);
  }

  clearCart(orderForm) {
    requestCache.clear();

    let items = orderForm.items || [];
    items = items.map(item => {
      item.quantity = 0;
      return item;
    });

    items.forEach(item => {
      Fetcher.updateItems(orderForm.orderFormId, [item]).then((response) => {
        this.actions.orderFormSuccess.defer(response.data);
      });
    });
  }

  setShipping(data) {
    if(!data.orderFormId) {
      Fetcher.getOrderForm().then((response) => {
        data.orderFormId = response.data.orderFormId;
        this.actions.orderFormSuccess.defer(response.data);
        this.actions.executeSetShipping.defer(data);
      }).catch(() => {
        this.actions.orderFormFailed.defer('Ocorreu um erro ao inicializar o carrinho');
      });
    } else {
      this.actions.executeSetShipping.defer(data);
    }
  }

  executeSetShipping(data) {
    this.dispatch();

    Fetcher.setShipping(data.orderFormId, data.address).then(() => {
      this.actions.setCheckedIn.defer(data.orderFormId);
    }).catch(() => {
      this.actions.requestFailed.defer('Ocorreu um erro ao setar os dados da loja');
    });
  }

  setCheckedIn(orderFormId) {
    if(!orderFormId) {
      Fetcher.getOrderForm().then((response) => {
        orderFormId = response.data.orderFormId;
        this.actions.orderFormSuccess.defer(response.data);
        this.actions.executeSetCheckedIn.defer(orderFormId);
      }).catch(() => {
        this.actions.orderFormFailed.defer('Ocorreu um erro ao inicializar o carrinho');
      });
    } else {
      this.actions.executeSetCheckedIn.defer(orderFormId);
    }
  }

  executeSetCheckedIn(orderFormId) {
    this.dispatch();

    Fetcher.setCheckedIn(orderFormId).then((response) => {
      this.actions.orderFormSuccess.defer(response.data);
    }).catch(() => {
      this.actions.requestFailed.defer('Ocorreu um erro ao setar os dados da loja');
    });
  }

  setDefaultPayment(data) {
    this.dispatch();

    Fetcher.getOrderForm().then((response) => {
      const defaultPayment = _.find(response.data.paymentData.installmentOptions, (payment) => payment.paymentSystem == 45 || payment.paymentSystem == 44);

      if(defaultPayment && defaultPayment.installments.length > 0) {
        this.actions.orderFormSuccess.defer(response.data);
      }
      else {
        Fetcher.setPayment(response.data.orderFormId, defaultPayment).then((response) => {
          this.actions.orderFormSuccess.defer(response.data);
          this.actions.setDefaultPaymentSuccess.defer(response.data);
        }).catch((err) => {
          this.actions.setDefaultPaymentFail.defer(err);
          this.actions.requestFailed.defer('Ocorreu um erro ao setar a opção de pagamento');
        });
      }

    }).catch(() => {
      this.actions.orderFormFailed.defer('Ocorreu um erro ao inicializar o carrinho');
    });

  }

  setDefaultPaymentSuccess(orderForm) {
    this.dispatch(orderForm);
  }

  setDefaultPaymentFail(errorMessage) {
    this.dispatch(errorMessage);
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
}

export default flux.createActions(CartActions);
