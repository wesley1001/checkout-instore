let request = function(obj) {
  return obj;
}

class Fetcher {
  constructor() {
    this.orderFormSections = ['items','gifts','totalizers','clientProfileData','shippingData','paymentData','sellers','messages','marketingData','clientPreferencesData','storePreferencesData'];
    this.checkoutUrl = '/api/checkout/pub/orderForm';
  }

  getOrderForm() {
    return request({
      url: this.checkoutUrl,
      type: 'json'
    });
  }

  setCheckedIn(orderFormId) {
    return request({
      url: `${this.checkoutUrl}/${orderFormId}/isCheckedIn`,
      type: 'json',
      method: 'put',
      contentType: 'application/json',
      data: JSON.stringify({isCheckedIn: true})
    });
  }

  getProduct(code) {
    return request({
      url: `/api/catalog_system/pub/sku/stockkeepingunitByEan/${code}`,
      type: 'json'
    });
  }

  addToCart(orderForm, items) {
    const checkoutRequest = {
      orderItems: items,
      expectedOrderFormSections: this.orderFormSections
    };

    return request({
      url: `${this.checkoutUrl}/${orderForm}/items`,
      type: 'json',
      method: 'post',
      contentType: 'application/json',
      data: JSON.stringify(checkoutRequest)
    });
  }

  updateItems(orderForm, items) {
    const checkoutRequest = {
      orderItems: items,
      expectedOrderFormSections: this.orderFormSections
    };

    return request({
      url: `${this.checkoutUrl}/${orderForm}/items/update`,
      type: 'json',
      method: 'post',
      contentType: 'application/json',
      data: JSON.stringify(checkoutRequest)
    });
  }

  setPayment(orderForm, payment) {
    const paymentRequest = {
      expectedOrderFormSections: this.orderFormSections,
      payments: [payment],
      giftCards: []
    };

    return request({
      url: `/api/checkout/pub/orderForm/${orderForm}/attachments/paymentData`,
      type: 'json',
      method: 'post',
      contentType: 'application/json',
      data: JSON.stringify(paymentRequest)
    });
  }

  setClientProfile(orderForm, email) {
    const clientProfileRequest = {
      expectedOrderFormSections: this.orderFormSections,
      email,
      firstEmail: email,
      document: '070.730.867-42',
      documentType: 'cpf',
      firstName: 'VTEX',
      isCorporate: false,
      lastName: 'inStore',
      phone: '+55 11 4058 9990',
      stateInscription: ''
    };

    return request({
      url: `/api/checkout/pub/orderForm/${orderForm}/attachments/clientProfileData`,
      type: 'json',
      method: 'post',
      contentType: 'application/json',
      data: JSON.stringify(clientProfileRequest)
    });
  }

  setShipping(orderForm, address) {
    const shippingRequest = {
      expectedOrderFormSections: this.orderFormSections,
      address
    };

    return request({
      url: `/api/checkout/pub/orderForm/${orderForm}/attachments/shippingData`,
      type: 'json',
      method: 'post',
      contentType: 'application/json',
      data: JSON.stringify(shippingRequest)
    });
  }

  startTransaction(orderForm, value) {
    const transactionRequest = {
      referenceId: orderForm,
      savePersonalData: false,
      optinNewsLetter: false,
      value: value,
      referenceValue: value,
      interestValue: value,
      expectedOrderFormSections : this.orderFormSections
    };

    return request({
      url: `/api/checkout/pub/orderForm/${orderForm}/transaction`,
      type: 'json',
      method: 'post',
      contentType: 'application/json',
      data: JSON.stringify(transactionRequest)
    });
  }
}

export default new Fetcher();
