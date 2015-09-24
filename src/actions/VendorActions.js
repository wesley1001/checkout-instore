import flux from '../flux';

class VendorActions {
  login() {
    let that = this;
    $(window).on('authenticatedUser.vtexid', (evt) => {
      console.log('logged');
      that.actions.LoginSuccess(evt);
    });
    vtexid.start({returnUrl: window.location.href });
  }
  LoginSuccess(data){
    this.dispatch();
  }
  LoginFail(error){
    this.dispatch(error);
  }
}

export default flux.createActions(VendorActions);
