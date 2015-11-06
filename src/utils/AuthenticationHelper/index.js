class AuthenticationHelper {
  login(callback) {
    $(window).on('authenticatedUser.vtexid', () => {
      if(typeof callback === 'function')
      callback();
    });
    vtexid.start({returnUrl: window.location.href, canClose: false });
  }

  getVtexAuthToken() {
    return Cookies.get('VtexIdclientAutCookie') || '';
  }

  logout() {
    vtexid.logout();
  }

  validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email);
  }
}

export default new AuthenticationHelper();
