import flux from '../flux';

import Fetcher from 'utils/Fetcher';
import AuthenticationHelper from 'utils/AuthenticationHelper';

class VendorActions {
  CheckLogin() {
    this.dispatch();
    Fetcher.checkVtexIdAuth().then((userData) => {
      Fetcher.getProfileSystemData(userData.user).then((response) => {
        const data = {
          user: userData,
          store: response
        };

        this.actions.VtexIdAuthSuccess(data);
      });
    }, (err) => {
      AuthenticationHelper.login(this.actions.CheckLogin);
    });
  }

  VtexIdAuthSuccess(data){
    data.logged = true;
    this.dispatch(data);
  }

  VtexIdAuthFail(error){
    this.dispatch(error);
  }

  GetStoreInfo(storeId) {
    this.dispatch();
    if(!storeId) {
      const reason = 'storeId is undefined. We\'ll use default trade policy';
      this.actions.GetStoreInfoFail({message: reason});
    }

    Fetcher.getStoreData(storeId).then((response) => {
      this.actions.GetStoreInfoSuccess(response);
    }).catch((err) => {
      const reason = 'Fail on get trade policy. We\'ll use default trade policy';
      this.actions.GetStoreInfoFail({message: reason});
    });
  }

  GetStoreInfoSuccess(data){
    this.dispatch(data);
  }

  GetStoreInfoFail(error){
    this.dispatch(error);
  }

  SetVendorDataSuccess(data){
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
      Fetcher.getProfileSystemData(storename, id).then((response) => {
        response.id = id;
        const data = {
          user: response
        };

        this.actions.SetVendorDataSuccess(data);
      }, (err) => {
        this.actions.SetVendorDataFail({message:'Vendedor não identificado'});
      });
    }, (err) => {
      this.actions.GetStoreByHostFail({message: 'Error on identify store by host'});
    });
  }
}

export default flux.createActions(VendorActions);
