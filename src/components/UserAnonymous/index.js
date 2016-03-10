import React from 'react';
import {Link} from 'react-router';

import CheckoutActions from 'actions/CheckoutActions';
import './index.less';

export default class Authentication extends React.Component {
  constructor(props) {
    super(props);

    this.handleAnonymous = this.handleAnonymous.bind(this);
  }

  handleAnonymous() {
    CheckoutActions.setAnonymousData();
  }

  render() {
    return (
      <div className="UserAnonymous container">
        <div className="text">ou</div>
        <div className="container">
          <Link className="btn btn-default btn-block" to="/shop" onClick={this.handleAnonymous}>Continuar sem identificação</Link>
        </div>
      </div>
    );
  }
}
