import flux from '../flux';

import Fetcher from 'utils/Fetcher';

class VtexActions {
  login() {
    let that = this;
    $(window).on('authenticatedUser.vtexid', (evt) => {
      that.actions.VtexIdAuthSuccess(evt);
    });
    // $(window).on('tokenRefreshed.vtexid', (evt) => {
    //   console.log('2 - CHEGUEI ESTOU NO PARAISO');
    //   that.actions.VtexIdAuthRefreshed(evt);
    // });
    vtexid.start({returnUrl: window.location.href, canClose: false });
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
