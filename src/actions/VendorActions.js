import flux from '../flux';

import Fetcher from 'utils/Fetcher';
import AuthenticationHelper from 'utils/AuthenticationHelper';

class VendorActions {
  GetStoreInfo(storeId) {
    this.dispatch();
    const errorReason = 'Oops, houve um erro ao buscar a política comercial da sua loja. Usaremos a política comercial padrão.';

    if(!storeId) {
      console.error('storeId is undefined. We\'ll use default trade policy');
      this.actions.GetStoreInfoFail({message: errorReason});
    }

    Fetcher.getStoreData(storeId).then((response) => {
      this.actions.GetStoreInfoSuccess(response);
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
      this.actions.SetVendorDataFail({message:`Você deve digitar ao menos 1 caractere de identificação`});
      return;
    }

    Fetcher.getStoreByHost().then((storeData) => {
      const storename = storeData.MainAccountName;
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
    }, (err) => {
      this.actions.GetStoreByHostFail({message: 'Oops, houve um erro ao identificar a loja pelo host!'});
    });
  }

  clearVendorData() {
    window.localStorage.removeItem('vendorData');
    this.dispatch();
  }
}

export default flux.createActions(VendorActions);
