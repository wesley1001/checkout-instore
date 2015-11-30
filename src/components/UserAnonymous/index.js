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
    CheckoutActions.setClientData({email: '', orderForm: this.props.orderForm.orderFormId});
  }

  render() {
    return (
      <div className="UserAnonymous">
        <Link className="btn btn-default btn-lg btn-block btn-bottom" to="/shop" onClick={this.handleAnonymous}>Continuar sem identificação</Link>
      </div>
    );
  }
}
