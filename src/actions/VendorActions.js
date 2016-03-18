import flux from '../flux';
import Fetcher from 'utils/Fetcher';

function GetStoreInfo(storeId) {
  const errorReason = 'Oops, houve um erro ao buscar a política comercial da sua loja. Usaremos a política comercial padrão.';

  return new Promise((resolve, reject) => {
    if(!storeId) {
      console.error('storeId is undefined. We\'ll use default trade policy');
      storeId = 1;
    }

    return Fetcher.getStoreData(storeId).then((response) => {
      response.id = storeId;
      resolve(response);
    }).catch((err) => {
      console.error('Fail on get trade policy. We\'ll use default trade policy');
      reject({message: errorReason});
    });

  });
}

class VendorActions {
  SetInstoreData(id) {
    this.dispatch();

    if (!id) {
      this.actions.SetInstoreDataFail({
        message: `Você deve digitar ao menos 1 caractere de identificação`
      });
      return;
    }

    Fetcher.getProfileSystemData(id).then((userData) => {
      userData.id = id;

      GetStoreInfo(userData.store).then((storeData) => {
        const instoreData = {
          user: userData,
          store: storeData
        };

        this.actions.SetInstoreDataSuccess.defer(instoreData);
      });
    }, (err) => {
      this.actions.SetInstoreDataFail({message: err.message});
    });
  }

  clearInstoreData() {
    window.localStorage.removeItem('store');
    window.localStorage.removeItem('user');

    if(window.WebViewBridge){
      window.WebViewBridge.send(JSON.stringify({
        type: 'event',
        event: 'clearVendorData'
      }));
    }
    else {

    }{
      console.warn('WebViewBridge is not defined!');
    }

    this.dispatch();
  }

  SetInstoreDataSuccess(data) {
    if(window.WebViewBridge){
      window.WebViewBridge.send(JSON.stringify({
        type: 'event',
        event: 'userLoggedIn',
        data: data.user
      }));
    }
    else {
      console.warn('WebViewBridge is not defined!');
    }

    window.localStorage.setItem('store', JSON.stringify(data.store));
    window.localStorage.setItem('user', JSON.stringify(data.user));

    this.dispatch(data);
  }

  SetInstoreDataFail(data) {
    window.localStorage.removeItem('store');
    window.localStorage.removeItem('user');

    this.dispatch(data);
  }

  dismissCurrentNotifications(){
    this.dispatch();
  }
}

export default flux.createActions(VendorActions);
