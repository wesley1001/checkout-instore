import flux from '../flux';

import Fetcher from 'utils/Fetcher';
import AuthenticationHelper from 'utils/AuthenticationHelper';

class VtexActions {
  checkLogin() {
    Fetcher.checkVtexIdAuth().then((userData) => {
      const storename = this.actions.GetStoreName();
      Fetcher.getProfileSystemData(storename, userData.user).then((response) => {
        const data = {
          user: userData,
          store: response
        };

        this.actions.VtexIdAuthSuccess(data);
      }, (err) => {
        console.log('error on get user profile data', err);
        AuthenticationHelper.login(this.actions.checkLogin);
      });
    }, (err) => {
      console.log('error on check user auth', err);
      AuthenticationHelper.login(this.actions.checkLogin);
    });
  }

  VtexIdAuthSuccess(data){
    data.logged = true;
    this.dispatch(data);
  }

  VtexIdAuthFail(error){
    this.dispatch(error);
  }

  getStoreInfo(storeId) {
    let promise = new Promise((resolve, reject) => {
      if(!storeId) {
        const reason = 'storeId is undefined. We\'ll use default trade policy';
        this.actions.GetStoreInfoFail({message: reason});
        reject(reason);
      }

      const storename = this.actions.GetStoreName();
      Fetcher.getStoreData(storename, storeId).then((response) => {
        this.actions.GetStoreInfoSuccess(response);
        resolve(response);
      }).catch((err) => {
        const reason = 'Fail on get trade policy. We\'ll use default trade policy';
        this.actions.GetStoreInfoFail({message: reason});
        reject(reason);
      });
    });

    return promise;
  }

  GetStoreInfoSuccess(data){
    this.dispatch(data);
  }

  GetStoreInfoFail(error){
    console.log(error.message);
    this.dispatch(error);
  }

  GetStoreName() {
    return window.location.hostname.split('.vtex')[0];
  }
}

export default flux.createActions(VtexActions);
