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

  SetVendorData(data) {
    this.dispatch();

    if(data.id && data.id.length > 1) {
      this.actions.SetVendorDataSuccess(data);
    }
    else {
      this.actions.SetVendorDataFail({message:'Erro ao identificar o vendedor'});
    }
  }
}

export default flux.createActions(VendorActions);
