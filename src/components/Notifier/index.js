import React from 'react';

import CheckoutActions from 'actions/CheckoutActions';
import CartActions from 'actions/CartActions';
import VendorActions from 'actions/VendorActions';

import CheckoutStore from 'stores/CheckoutStore';
import CartStore from 'stores/CartStore';
import VendorStore from 'stores/VendorStore';

import './index.less';

import bug from 'assets/images/bug.svg';

export default class Notifier extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      checkout: CheckoutStore.getState(),
      cart: CartStore.getState(),
      vendor: VendorStore.getState()
    };

    this.onCheckoutChange = this.onCheckoutChange.bind(this);
    this.onCartChange = this.onCartChange.bind(this);
    this.onVendorChange = this.onVendorChange.bind(this);
  }

  componentDidMount() {
    CheckoutStore.listen(this.onCheckoutChange);
    CartStore.listen(this.onCartChange);
    VendorStore.listen(this.onVendorChange);
  }

  componentWillUnmount() {
    CheckoutStore.unlisten(this.onCheckoutChange);
    CartStore.unlisten(this.onCartChange);
    VendorStore.unlisten(this.onVendorChange);
  }

  onCartChange(state) {
    this.setState({cart: state});
  }

  onCheckoutChange(state) {
    this.setState({checkout: state});
  }

  onVendorChange(state) {
    this.setState({vendor: state});
  }

  dismissCurrentNotifications() {
    CheckoutActions.dismissCurrentNotifications();
    CartActions.dismissCurrentNotifications();
    VendorActions.dismissCurrentNotifications();
  }

  render() {
    let {cart, checkout, vendor} = this.state;

    let error = cart.get('error') || checkout.get('error') || vendor.get('error');
    let message = cart.get('message');

    let errorContent = error ? (<span className="error container">{error}</span>) : '';
    let messageContent = !error && message ? (<span className="message container">{message}</span>) : '';

    let content = (
      <div id="notifierContent" className="background">
        <div className="wrapper">
          <img src={bug} width="120"/><br/><br/>
          {errorContent}
          {messageContent}<br/><br/>
          <button className="btn btn-default" onClick={this.dismissCurrentNotifications}>Fechar</button>
        </div>
      </div>
    );

    return (
      <div className="Notifier component">
        {error || message ? content : ''}
      </div>
    );
  }
}
