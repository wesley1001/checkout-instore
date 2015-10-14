import flux from '../flux';

import Fetcher from 'utils/Fetcher';
import AuthenticationHelper from 'utils/AuthenticationHelper';

class VendorActions {
  CheckLogin() {
    this.dispatch();
    Fetcher.checkVtexIdAuth().then((userData) => {
      Fetcher.getStoreByHost().then((storeData) =>{
        const storename = storeData.MainAccountName;
        Fetcher.getProfileSystemData(storename, userData.user).then((response) => {
          const data = {
            user: userData,
            store: response
          };

          this.actions.VtexIdAuthSuccess(data);
        }, (err) => {
          AuthenticationHelper.login(this.actions.CheckLogin);
        });
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

    Fetcher.getStoreByHost().then((storeData) =>{
      const storename = storeData.MainAccountName;

      Fetcher.getStoreData(storename, storeId).then((response) => {
        this.actions.GetStoreInfoSuccess(response);
      }).catch((err) => {
        const reason = 'Fail on get trade policy. We\'ll use default trade policy';
        this.actions.GetStoreInfoFail({message: reason});
      });
    }).catch((err) => {
      const reason = 'Fail on get store MainAccountName.';
      this.actions.GetStoreInfoFail({message: reason});
    });
  }

  GetStoreInfoSuccess(data){
    this.dispatch(data);
  }

  GetStoreInfoFail(error){
    this.dispatch(error);
  }
}

export default flux.createActions(VendorActions);
