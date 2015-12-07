import React from 'react';
import {Link} from 'react-router';

import CartStore from 'stores/CartStore';
import CheckoutActions from 'actions/CheckoutActions';
import CheckoutStore from 'stores/CheckoutStore';
import UserAuthentication from 'components/UserAuthentication';

import './index.less';

export default class UserInfo extends React.Component {
  static defaultProps = {
    email: ''
  }

  constructor(props) {
    super(props);

    this.state = {
      cart: CartStore.getState(),
      checkout: CheckoutStore.getState()
    };

    this.composeWelcomeMessage = this.composeWelcomeMessage.bind(this);
    this.onCheckoutChange = this.onCheckoutChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    CheckoutStore.listen(this.onCheckoutChange);
  }

  componentWillUnmount() {
    CheckoutStore.unlisten(this.onCheckoutChange);
  }

  onCheckoutChange(state) {
    this.setState({checkout: state});
  }

  handleClick() {
    CheckoutActions.showTypeEmailForm();
    CheckoutActions.hideTypeBarReaderForm();
  }


  composeWelcomeMessage() {
    const {email} = this.props;
    const {cart} = this.state;
    let disclaimerUserAuth, disclaimerMessage;

    if (this.state.checkout.get('typingEmail')) {
      disclaimerMessage = (
        <div id="disclaimer-user-auth" className="component UserInfo">
          <h2 className="title main-title">
            <span className="main-title-name title">Cliente</span>
            <span className="main-title-border"></span>
          </h2>
          <div className="container auth">
            <UserAuthentication orderForm={cart.get('orderForm')} history={this.props.history} getFocus="true"/>
          </div>
        </div>
      );
      disclaimerUserAuth = null;
    } else {
      disclaimerMessage = null;
      disclaimerUserAuth = (
        <p id="disclaimer-message" className="disclaimer container component UserInfo">
          <span>Cliente não identificado.</span>
          <button className="signin btn-link" onClick={this.handleClick}>Identificar agora?</button>
        </p>
      );
    }

    if(email === '') {
      return (
        <div>
          {disclaimerMessage}
          {disclaimerUserAuth}
        </div>
      )
    }

    return (
      <p className="disclaimer container">
        <span>Cliente: <strong>{email}</strong>. </span>
        <Link to="/" className="signout">Está incorreto?</Link>
      </p>
    );
  }

  render() {
    const welcomeMessage = this.composeWelcomeMessage();

    return (
      <div className="UserInfo component">
        {welcomeMessage}
      </div>
    );
  }
}
