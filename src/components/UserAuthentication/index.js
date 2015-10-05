import React from 'react';
import {Link} from 'react-router';

import CheckoutActions from 'actions/CheckoutActions';
import './index.less';

export default class Authentication extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email:''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAnonymous = this.handleAnonymous.bind(this);
  }

  handleChange(e) {
    this.setState({email: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();

    if(this.state.email) {
      CheckoutActions.addCustomerEmail({email: this.state.email, orderForm: this.props.orderForm.orderFormId});
      this.props.history.pushState(null, '/shop');
    }
  }

  handleAnonymous() {
    CheckoutActions.addCustomerEmail({email: '', orderForm: this.props.orderForm.orderFormId});
  }

  render() {
    return (
      <div className="UserAuthentication component">
        <h2 className="title main-title">
          <span className="main-title-name">Identificação</span>
          <span className="main-title-border"></span>
        </h2>

        <div className="container">
          <form className="text-center" onSubmit={this.handleSubmit}>
            <div className="input-group">
              <input id="email"
                className="form-control"
                type="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
                autoComplete="off"
              />
              <span className="input-group-btn">
                <button type="submit" className="btn btn-primary">OK</button>
              </span>
            </div>

            <div className="anonymous">
              <Link className="btn btn-default btn-lg btn-block btn-bottom" to="/shop" onClick={this.handleAnonymous}>Continuar anônimo</Link>
            </div>
          </form>

        </div>
      </div>
    );
  }
}
