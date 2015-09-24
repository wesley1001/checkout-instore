import flux from '../flux';

class VendorActions {
  setVendor(data) {
    this.dispatch(data.id);

    if(data.id.length > 0) {
      this.actions.LoginSuccess.defer(data);
    }
    else {
      this.actions.LoginFail.defer('Ocorreu um erro ao identifcar o vendendor');
    }
  }
  LoginSuccess(data){
    this.dispatch(data);
  }
  LoginFail(error){
    this.dispatch(error);
  }
}

export default flux.createActions(VendorActions);
