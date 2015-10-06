class AuthenticationHelper {
  login(callback) {
    $(window).on('authenticatedUser.vtexid', () => {
      if(typeof callback === 'function')
      callback();
    });
    vtexid.start({returnUrl: window.location.href, canClose: false });
  }

  logout() {
    vtexid.logout();
  }
}

export default new AuthenticationHelper();
