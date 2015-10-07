import flux from '../flux';

import Fetcher from 'utils/Fetcher';
import AuthenticationHelper from 'utils/AuthenticationHelper';

class VtexActions {
  checkLogin() {
    this.dispatch();

    Fetcher.checkVtexIdAuth().then((userData) => {
      Fetcher.getProfileSystemData('omniera', userData.user).then((response) => {
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
    return Fetcher.getStoreData('omniera', storeId).then((response) => {
      this.actions.GetStoreInfoSuccess(response);
    }).catch((err) => {
    });
  }

  GetStoreInfoSuccess(data){
    this.dispatch(data);
  }

  GetStoreInfoFail(error){
    this.dispatch(error);
  }
}

export default flux.createActions(VtexActions);
