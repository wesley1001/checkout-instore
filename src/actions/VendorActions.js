import flux from '../flux';

import Fetcher from 'utils/Fetcher';

class VendorActions {
  GetStoreInfo(storeId) {
    this.dispatch();
    const errorReason = 'Oops, houve um erro ao buscar a política comercial da sua loja. Usaremos a política comercial padrão.';

    if(!storeId) {
      console.error('storeId is undefined. We\'ll use default trade policy');
      this.actions.GetStoreInfoFail({message: errorReason});
    }

    Fetcher.getStoreData(storeId).then((response) => {
      response.id = storeId;
      this.actions.GetStoreInfoSuccess(response);
      window.localStorage.setItem('storeData', JSON.stringify(response));
    }).catch((err) => {
      console.error('Fail on get trade policy. We\'ll use default trade policy');
      this.actions.GetStoreInfoFail({message: errorReason});
    });
  }

  GetStoreInfoSuccess(data){
    this.dispatch(data);
  }

  GetStoreInfoFail(error){
    this.dispatch(error);
  }

  SetVendorDataSuccess(data){
    if(window.WebViewBridge){
      window.WebViewBridge.send(JSON.stringify({
        type: 'event',
        event: 'userLoggedIn',
        data: data
      }));
    }
    else{
      console.warn('WebViewBridge is not defined!');
    }

    this.dispatch(data);
  }

  SetVendorDataFail(error){
    this.dispatch(error);
  }

  SetVendorData(id) {
    this.dispatch();

    if (!id) {
      this.actions.SetVendorDataFail({
        message: `Você deve digitar ao menos 1 caractere de identificação`
      });
      return;
    }

    Fetcher.getProfileSystemData(id).then((response) => {
      response.id = id;
      const data = {
        user: response
      };

      this.actions.SetVendorDataSuccess(data);
      window.localStorage.setItem('vendorData', JSON.stringify(data));
    }, (err) => {
      this.actions.SetVendorDataFail({message: err.message});
    });
  }

  clearVendorData() {
    window.localStorage.removeItem('vendorData');

    if(window.WebViewBridge){
      window.WebViewBridge.send(JSON.stringify({
        type: 'event',
        event: 'clearVendorData'
      }));
    }
    else{
      console.warn('WebViewBridge is not defined!');
    }

    this.dispatch();
  }

  dismissCurrentNotifications(){
    this.dispatch();
  }
}

export default flux.createActions(VendorActions);
