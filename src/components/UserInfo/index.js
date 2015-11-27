import React from 'react';
import {Link} from 'react-router';

import UserAuthentication from 'components/UserAuthentication';

import './index.less';

export default class UserInfo extends React.Component {
  static defaultProps = {
    email: ''
  }

  constructor(props) {
    super(props);

    this.state = {
      showIdForm: false
    };

    this.composeWelcomeMessage = this.composeWelcomeMessage.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick(e) {
    this.setState({ 'showIdForm': true });
  }


  composeWelcomeMessage() {
    const {email} = this.props;
    let disclaimerUserAuth, disclaimerMessage;

    if (this.state.showIdForm) {
      disclaimerMessage = (
        <div id="disclaimer-user-auth">
          <UserAuthentication/>
        </div>
      );
      disclaimerUserAuth = null;
    } else {
      disclaimerMessage = null;
      disclaimerUserAuth = (
        <p id="disclaimer-message" className="disclaimer container">
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
