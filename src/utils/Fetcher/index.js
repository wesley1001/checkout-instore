import axios from 'axios';

const ORDER_FORM_SECTIONS = ['items','gifts','totalizers','clientProfileData','shippingData','paymentData','sellers','messages','marketingData','clientPreferencesData','storePreferencesData'];
const CHECKOUT_ORDER_FORM_PATH = '/api/checkout/pub/orderForm';
const CRM_ADDRESS = 'api.vtexcrm.com.br';
const HOSTNAME = window.location.hostname;
const CRM_DATA_ENTITIES_ENDPOINT = `//${CRM_ADDRESS}/${HOSTNAME}/dataentities`;
const CRM_VENDOR_ENTITY = 'VN';
const CRM_STORE_ENTITY = 'SO';
const CRM_DEFAULT_HEADERS = {
  'Accept': 'application/vnd.vtex.ds.v10+json',
  'Content-Type': 'application/vnd.vtex.ds.v10+json',
  'REST-Range': 'resources=0-99'
};
const DEFAULT_FIRST_NAME = 'VTEX';
const DEFAULT_LAST_NAME = 'inStore';
const DEFAULT_PHONE = '+55 11 4058 9990';
const DEFAULT_IS_CORPORATE_VALUE = false;
const DEFAULT_STATE_INSCRIPTION = '';
const CPF_DOCUMENT_TYPE_KEY = 'cpf';
const ORDER_GROUP_DEFAULT_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

class Fetcher {
  getOrderForm() {
    return axios.get(CHECKOUT_ORDER_FORM_PATH);
  }

  setClientProfile(orderFormId, email, cpf = '') {
    const request = {
      expectedOrderFormSections: ORDER_FORM_SECTIONS,
      email,
      firstEmail: email,
      document: cpf,
      documentType: CPF_DOCUMENT_TYPE_KEY,
      firstName: DEFAULT_FIRST_NAME,
      isCorporate: DEFAULT_IS_CORPORATE_VALUE,
      lastName: DEFAULT_LAST_NAME,
      phone: DEFAULT_PHONE,
      stateInscription: DEFAULT_STATE_INSCRIPTION
    };

    return axios.post(`${CHECKOUT_ORDER_FORM_PATH}/${orderFormId}/attachments/clientProfileData`, request);
  }

  setShipping(orderFormId, address) {
    const request = {
      expectedOrderFormSections: ORDER_FORM_SECTIONS,
      address
    };

    return axios.post(`${CHECKOUT_ORDER_FORM_PATH}/${orderFormId}/attachments/shippingData`, request);
  }

  setCheckedIn(orderFormId) {
    const request = {
      isCheckedIn: true
    };

    return axios.put(`${CHECKOUT_ORDER_FORM_PATH}/${orderFormId}/isCheckedIn`, request);
  }

  getProduct(code) {
    return axios.get(`/api/catalog_system/pub/sku/stockkeepingunitByEan/${code}`);
  }

  addToCart(orderForm, item, vendor, tradePolicy = 1) {
    const queryString = {
      sku: item.id,
      qty: item.quantity,
      seller: item.seller,
      sc: tradePolicy,
      utm_source: vendor,
      redirect: false
    };

    const request = {
      orderItems: [item],
      expectedOrderFormSections: ORDER_FORM_SECTIONS
    };

    return axios.post(`/checkout/cart/add`, request, {
      params: queryString
    });
  }

  updateItems(orderFormId, items, tradePolicy = 1) {
    const queryString = {
      sc: tradePolicy
    };

    const checkoutRequest = {
      orderItems: items,
      expectedOrderFormSections: this.orderFormSections
    };

    return axios.post(`${CHECKOUT_ORDER_FORM_PATH}/${orderFormId}/items/update`, checkoutRequest, {
      params: queryString
    });
  }

  setPayment(orderFormId, payment) {
    const request = {
      expectedOrderFormSections: ORDER_FORM_SECTIONS,
      payments: [payment],
      giftCards: []
    };

    return axios.post(`${CHECKOUT_ORDER_FORM_PATH}/${orderFormId}/attachments/paymentData`, request);
  }

  startTransaction(orderFormId, value) {
    const request = {
      referenceId: orderFormId,
      savePersonalData: false,
      optinNewsLetter: false,
      value: value,
      referenceValue: value,
      interestValue: value,
      expectedOrderFormSections : ORDER_FORM_SECTIONS
    };

    return axios.post(`${CHECKOUT_ORDER_FORM_PATH}/${orderFormId}/transaction`, request);
  }

  getProfileSystemData(id) {
    if(id){
      id = id.toLowerCase().trim();
    }

    const fields = ['store', 'name', 'user'];
    const queryString = {
      _where: `user=${id}`,
      _fields: fields.join(',')
    };

    const url = `${CRM_DATA_ENTITIES_ENDPOINT}/${CRM_VENDOR_ENTITY}/search`

    let configs = {
      headers: CRM_DEFAULT_HEADERS,
      params: queryString
    };

    return new Promise((resolve, reject) => {
      return axios.get(url, configs).then((response) => {
        if(response.data && response.data.length) {
          resolve(response.data[0]);
          return;
        }
        reject({message:`Vendedor não identificado`});
      }, (err) => {
        reject({message:`Oops, houve um erro ao identificar o vendedor`});
      });
    });
  }

  getStoreData(id) {
    const fields = ['name', 'tradePolicy'];
    const queryString = {
      _fields: fields.join(',')
    };

    const url = `${CRM_DATA_ENTITIES_ENDPOINT}/${CRM_STORE_ENTITY}/documents/${id}`

    let configs = {
      headers: CRM_DEFAULT_HEADERS,
      params: queryString
    };

    return axios.get(url, configs).then((response) => response.data);
  }

  getOrderGroup(orderGroupId) {
    const url = `/api/checkout/pub/orders/order-group/${orderGroupId}`;

    let configs = {
      'headers': ORDER_GROUP_DEFAULT_HEADERS
    };

    return axios.get(url, configs).then((response) => response.data);
  }
}

export default new Fetcher();
