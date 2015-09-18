import axios from 'axios';

class Fetcher {
  constructor() {
    this.orderFormSections = ['items','gifts','totalizers','clientProfileData','shippingData','paymentData','sellers','messages','marketingData','clientPreferencesData','storePreferencesData'];
    this.checkoutUrl = '/api/checkout/pub/orderForm';
  }

  getOrderForm() {
    return axios.get(this.checkoutUrl);
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

    return axios.post(`/api/checkout/pub/orderForm/${orderForm}/attachments/clientProfileData`, clientProfileRequest);
  }

  setShipping(orderForm, address) {
    const shippingRequest = {
      expectedOrderFormSections: this.orderFormSections,
      address
    };

    return axios.post(`/api/checkout/pub/orderForm/${orderForm}/attachments/shippingData`, shippingRequest);
  }

  setCheckedIn(orderFormId) {
    return axios.put(`${this.checkoutUrl}/${orderFormId}/isCheckedIn`, {isCheckedIn: true});
  }

  getProduct(code) {
    return axios.get(`/api/catalog_system/pub/sku/stockkeepingunitByEan/${code}`);
  }

  addToCart(orderForm, items) {
    const checkoutRequest = {
      orderItems: items,
      expectedOrderFormSections: this.orderFormSections
    };

    return axios.post(`${this.checkoutUrl}/${orderForm}/items`, checkoutRequest);
  }

  updateItems(orderForm, items) {
    const checkoutRequest = {
      orderItems: items,
      expectedOrderFormSections: this.orderFormSections
    };

    return axios.post(`${this.checkoutUrl}/${orderForm}/items/update`, checkoutRequest);
  }

  setPayment(orderForm, payment) {
    const paymentRequest = {
      expectedOrderFormSections: this.orderFormSections,
      payments: [payment],
      giftCards: []
    };

    return axios.post(`/api/checkout/pub/orderForm/${orderForm}/attachments/paymentData`, paymentRequest);
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

    return axios.post(`/api/checkout/pub/orderForm/${orderForm}/transaction`, transactionRequest);
  }
}

export default new Fetcher();
