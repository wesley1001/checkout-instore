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

  addToCart(orderForm, items, tradePolicy = 1) {
    const checkoutRequest = {
      orderItems: items,
      expectedOrderFormSections: this.orderFormSections
    };

    return axios.post(`${this.checkoutUrl}/${orderForm}/items?sc=${tradePolicy}`, checkoutRequest);
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

  checkVtexIdAuth() {
    let promise = new Promise((resolve, reject) => {
      const token = AuthenticationHelper.getVtexAuthToken();
      if(!token) {
        reject('token not found');
      }
      else {
        const url = `https://vtexid.vtex.com.br/api/vtexid/pub/authenticated/user?authToken=${encodeURIComponent(token)}`;

        axios.get(url).then((response) => {
          if(response.data !== null) {
            resolve(response.data);
          }
          else {
            reject('not authorized');
          }
        },() => {
          reject('not authorized');
        });
      }
    });

    return promise;
  }

  getProfileSystemData(accountName, email) {
    const entity = 'VN', query = `user=${email}`, fields = ['store'];

    const url = `http://api.vtexcrm.com.br/${accountName}/dataentities/${entity}/search?_where=${query}&_fields=${fields.join(',')}`

    let configs = {
      'headers': {
        'Accept': 'application/vnd.vtex.ds.v10+json',
        'Content-Type': 'application/vnd.vtex.ds.v10+json',
        'VtexIdclientAutCookie': AuthenticationHelper.getVtexAuthToken(),
        'REST-Range': 'resources=0-99'
      }
    };

    return axios.get(url, configs).then((response) => {
      let data = response.data;
      if(data && data.length) {
        return data[0];
      }
      return {store: undefined};
    }, (err) => {
      console.log('error', err);
    });
  }

  getStoreData(accountName, id) {
    const fields = ['name', 'tradePolicy'];
    const url = `http://api.vtexcrm.com.br/${accountName}/dataentities/SO/documents/${id}?_fields=${fields.join(',')}`

    let configs = {
      'headers': {
        'Accept': 'application/vnd.vtex.ds.v10+json',
        'Content-Type': 'application/vnd.vtex.ds.v10+json',
        'VtexIdclientAutCookie': AuthenticationHelper.getVtexAuthToken(),
        'REST-Range': 'resources=0-99'
      }
    };

    return axios.get(url, configs).then((response) => response.data);
  }

  getStoreByHost() {
    let cached = {};
    return (() => {
      const hostname = window.location.hostname;
      if(cached[hostname] != undefined) {
        let prom = new Promise((resolve, reject) => {
          resolve(cached[hostname]);
        });

        return prom;
      }

      const url = `http://licensemanager.vtex.com.br/api/license-manager/pvt/accounts/hosts/${hostname}`;

      let configs = {
        'headers': {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'V-VTEX-API-AppToken': AuthenticationHelper.getVtexAuthToken(),
          'X-VTEX-API-AppKey': 'vtexappkey-appvtex'
        },
        withCredentials: true
      };

      return axios.get(url, configs).then((response) => {
        cached[hostname] = response.data;
      });
    })();
  }
}

export default new Fetcher();
