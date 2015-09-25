import flux from '../flux';

import Fetcher from 'utils/Fetcher';

class VtexActions {
  login() {
    let that = this;
    Fetcher.checkVtexIdAuth(Cookies.get('VtexIdclientAutCookie')).then(() => {
      that.actions.VtexIdAuthSuccess();
    }, () => {
      $(window).on('authenticatedUser.vtexid', (evt) => {
        that.actions.VtexIdAuthSuccess();
      });

      vtexid.start({returnUrl: window.location.href, canClose: false });
    });
  }
  logout() {
    vtexid.logout();
  }
  VtexIdAuthRefreshed(){
    this.dispatch();
  }
  VtexIdAuthSuccess(){
    this.dispatch();
  }
  VtexIdAuthFail(error){
    this.dispatch(error);
  }
}

export default flux.createActions(VtexActions);
