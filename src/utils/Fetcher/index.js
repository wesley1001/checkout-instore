import AuthenticationHelper from 'utils/AuthenticationHelper';

import axios from 'axios';

class Fetcher {
  constructor() {
    this.orderFormSections = ['items','gifts','totalizers','clientProfileData','shippingData','paymentData','sellers','messages','marketingData','clientPreferencesData','storePreferencesData'];
    this.checkoutUrl = '/api/checkout/pub/orderForm';
  }

  getOrderForm() {
    return axios.get(this.checkoutUrl);
  }

  setClientProfile(orderForm, email, cpf = '') {
    const clientProfileRequest = {
      expectedOrderFormSections: this.orderFormSections,
      email,
      firstEmail: email,
      document: cpf,
      documentType: 'cpf',
      firstName: 'VTEX',
      isCorporate: false,
      lastName: 'inStore',
      phone: '+55 11 4058 9990',
      stateInscription: ''
    };

    return axios.post(`${this.checkoutUrl}/${orderForm}/attachments/clientProfileData`, clientProfileRequest);
  }

  setShipping(orderForm, address) {
    const shippingRequest = {
      expectedOrderFormSections: this.orderFormSections,
      address
    };

    return axios.post(`${this.checkoutUrl}/${orderForm}/attachments/shippingData`, shippingRequest);
  }

  setCheckedIn(orderFormId) {
    return axios.put(`${this.checkoutUrl}/${orderFormId}/isCheckedIn`, {isCheckedIn: true});
  }

  getProduct(code) {
    return axios.get(`/api/catalog_system/pub/sku/stockkeepingunitByEan/${code}`);
  }

  addToCart(orderForm, item, vendor, tradePolicy = 1) {
    const checkoutRequest = {
      orderItems: [item],
      expectedOrderFormSections: this.orderFormSections
    };

    return axios.post(`/checkout/cart/add?sku=${item.id}&qty=${item.quantity}&seller=${item.seller}&sc=${tradePolicy}&utm_source=${vendor}&redirect=false`, checkoutRequest);
  }

  updateItems(orderForm, items, tradePolicy = 1) {
    const checkoutRequest = {
      orderItems: items,
      expectedOrderFormSections: this.orderFormSections
    };

    return axios.post(`${this.checkoutUrl}/${orderForm}/items/update?sc=${tradePolicy}`, checkoutRequest);
  }

  setPayment(orderForm, payment) {
    const paymentRequest = {
      expectedOrderFormSections: this.orderFormSections,
      payments: [payment],
      giftCards: []
    };

    return axios.post(`${this.checkoutUrl}/${orderForm}/attachments/paymentData`, paymentRequest);
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

    return axios.post(`${this.checkoutUrl}/${orderForm}/transaction`, transactionRequest);
  }

  getProfileSystemData(id) {
    const entity = 'VN', query = `user=${id}`, fields = ['store', 'name', 'user'];
    const hostname = window.location.hostname;

    const url = `//api.vtexcrm.com.br/${hostname}/dataentities/${entity}/search?_where=${query}&_fields=${fields.join(',')}`

    let configs = {
      'headers': {
        'Accept': 'application/vnd.vtex.ds.v10+json',
        'Content-Type': 'application/vnd.vtex.ds.v10+json',
        'REST-Range': 'resources=0-99'
      }
    };
    const promise = new Promise((resolve, reject) => {
      return axios.get(url, configs).then((response) => {
        let data = response.data;
        if(data && data.length) {
          resolve(data[0]);
          return;
        }
        reject({message:`Vendedor não identificado`});
      }, (err) => {
        reject({message:`Oops, houve um erro ao identificar o vendedor`});
      });
    });

    return promise;
  }

  getStoreData(id) {
    const fields = ['name', 'tradePolicy'];
    const hostname = window.location.hostname;
    const url = `//api.vtexcrm.com.br/${hostname}/dataentities/SO/documents/${id}?_fields=${fields.join(',')}`

    let configs = {
      'headers': {
        'Accept': 'application/vnd.vtex.ds.v10+json',
        'Content-Type': 'application/vnd.vtex.ds.v10+json',
        'REST-Range': 'resources=0-99'
      }
    };

    return axios.get(url, configs).then((response) => response.data);
  }

  getStoreByHost() {
    let promise = new Promise((resolve, reject) => {
      resolve({MainAccountName: window.location.hostname.split('.vtex')[0]});
    });

    return promise;
  }

  getOrderGroup(orderGroupId) {
    const url = `/api/checkout/pub/orders/order-group/${orderGroupId}`;

    let configs = {
      'headers': {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    return axios.get(url, configs).then((response) => response.data);
  }
}

export default new Fetcher();
