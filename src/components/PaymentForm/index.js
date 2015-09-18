import React from 'react';

export default class PaymentForm extends React.Component {
  componentDidUpdate() {
    if(this.props.cart.get('gatewayUrl')) {
      React.findDOMNode(this.refs.setPayment).submit();
    }
  }

  render() {
    const {cart} = this.props;

    return (
      <form id="setPayments" className="PaymentForm component" ref="setPayment" method="post" action={cart.get('paymentUrl')}>
        <input id="paymentsArray"
          ref="paymentsArray"
          name="paymentsArray"
          type="hidden"
          value={JSON.stringify(cart.get('paymentObj').paymentsArray)}
        />

        <input id="callbackURL"
          ref="callbackURL"
          name="callbackUrl"
          type="hidden"
          value={window.location.protocol + '//' + window.location.host + cart.get('gatewayUrl')}
        />
      </form>
    );
  }
}
