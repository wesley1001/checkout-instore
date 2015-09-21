import React from 'react';
import {Link} from 'react-router';

import './index.less';

export default class UserInfo extends React.Component {
  constructor(props) {
    super(props);

    this.composeWelcomeMessage = this.composeWelcomeMessage.bind(this);
  }

  composeWelcomeMessage() {
    const {email} = this.props;

    if(email === '') {
      return '';
    }

    return (
      <p className="disclaimer">
        <span>Email do cliente: <strong>{email}</strong>. </span>
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
