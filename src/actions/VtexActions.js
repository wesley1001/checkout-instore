import flux from '../flux';

import Fetcher from 'utils/Fetcher';

class VtexActions {
  login() {
    let that = this;
    $(window).on('authenticatedUser.vtexid', (evt) => {
      that.actions.checkLogin();
    });
    vtexid.start({returnUrl: window.location.href, canClose: false });
  }

  checkLogin() {
    let data = {};
    let that = this;
    Fetcher.checkVtexIdAuth(Cookies.get('VtexIdclientAutCookie')).then((userData) => {
      that.actions.GetProfileData(userData).then((response) => {
        data.user = userData;
        data.store = response;
        that.actions.VtexIdAuthSuccess(data);
      }, (err) => {
        console.log('error on get user profile data', err);
        that.actions.login();
      });
    }, (err) => {
      console.log('error on check user auth', err);
      that.actions.login();
    });
  }

  logout() {
    vtexid.logout();
  }

  VtexIdAuthSuccess(data){
    data.logged = true;
    this.dispatch(data);
  }

  VtexIdAuthFail(error){
    this.dispatch(error);
  }

  getStoreInfo(storeId) {
    return Fetcher.getStoreData('dreamshop', storeId).then((response) => {
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

  GetProfileData(userData) {
    const email = userData.user;
    return Fetcher.getProfileSystemData('dreamshop', email);
  }
}

export default flux.createActions(VtexActions);
