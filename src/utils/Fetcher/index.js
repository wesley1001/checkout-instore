import axios from 'axios';
import requestCache from 'utils/Cache';

const ORDER_FORM_SECTIONS = ['items','gifts','totalizers','clientProfileData','shippingData','paymentData','sellers','messages','marketingData','clientPreferencesData','storePreferencesData'];
const CHECKOUT_ORDER_FORM_PATH = '/api/checkout/pub/orderForm';
const CHECKOUT_PROFILE_PATH = '/api/checkout/pub/profiles';
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
const MOCK_EAN_TO_SKU_MAP = {
  3000000000069: 25,
  3000000000076: 24,
  7891033208425: 1511
};

class Fetcher {
  getOrderForm() {
    return axios.get(CHECKOUT_ORDER_FORM_PATH);
  }

  setDefaultClientProfile(orderFormId, email, cpf = '') {
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

  setClientProfile(orderFormId, email) {
    const request = {
      expectedOrderFormSections: ORDER_FORM_SECTIONS,
      email,
    };

    return axios.post(`${CHECKOUT_ORDER_FORM_PATH}/${orderFormId}/attachments/clientProfileData`, request);
  }

  getPublicProfile(email) {
    return new Promise((resolve, reject) => {
      axios.get(`${CHECKOUT_PROFILE_PATH}?email=${email}`, email).then((response) => {
        if(response.data && response.data.userProfileId != null) {
          resolve(response.data);
        }

        reject({error: 'profile not found'});
      }, (err) => {
        reject({error: 'unable to find profileprofile'});
      });
    })
  }

  setShipping(orderFormId, address) {
    const request = {
      expectedOrderFormSections: ORDER_FORM_SECTIONS,
      address
    };

    return axios.post(`${CHECKOUT_ORDER_FORM_PATH}/${orderFormId}/attachments/shippingData`, request);
  }

  checkedIn(orderFormId, isCheckedIn, storeId) {
    const request = {
      isCheckedIn,
      storeId
    };

    return axios.post(`${CHECKOUT_ORDER_FORM_PATH}/${orderFormId}/checkIn`, request);
  }

  getSKUByEAN(ean) {
    return new Promise((resolve, reject) => {
      let sku = requestCache.get(ean);

      //TODO: remove this code in stable. using just to ignore catalog errors
      if(!sku && MOCK_EAN_TO_SKU_MAP[ean]){
        sku = MOCK_EAN_TO_SKU_MAP[ean];
      }

      if(sku) {
        resolve(sku);
        return;
      }

      return axios.get(`/api/catalog_system/pub/sku/stockkeepingunitByEan/${ean}`).then((response) => {
        requestCache.put(ean, response.data.Id);
        resolve(response.data.Id);
      }).catch((err) => {
        reject({message: 'Produto não encontrado'});
      });
    });
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

    let promise = new Promise((resolve, reject) => {
      axios.post(`/checkout/cart/add`, request, {
        params: queryString
      }).then(() => {
        this.getOrderForm().then((orderForm) => {
          resolve(orderForm);
        }, (err) => reject(err));
      },(err) => {
        reject({message:`Oops, ocorreu um erro ao adicionar o item`});
      });
    });

    return promise;
  }

  updateItems(orderFormId, items, tradePolicy = 1) {
    const queryString = {
      sc: tradePolicy
    };

    const checkoutRequest = {
      orderItems: items,
      expectedOrderFormSections: ORDER_FORM_SECTIONS
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
        reject({message:`Houve um erro ao identificar o vendedor`});
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
      headers: ORDER_GROUP_DEFAULT_HEADERS
    };

    return axios.get(url, configs).then((response) => response.data);
  }
}

export default new Fetcher();
