import React from 'react';
import {Link} from 'react-router';

import AuthenticationHelper from '../../utils/AuthenticationHelper';
import CheckoutActions from 'actions/CheckoutActions';

export default class Authentication extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email:'',

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({email: e.target.value.toLowerCase(), isValid: true});
  }

  handleSubmit(e) {
    e.preventDefault();

    if(this.state.email) {
      if(!AuthenticationHelper.validateEmail(this.state.email)) {
        this.setState({isValid: false});
      } else {
        CheckoutActions.setClientData({email: this.state.email, orderForm: this.props.orderForm.orderFormId});
        this.props.history.pushState(null, '/shop');
      }
    }
  }

  render() {
    return (
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
      </form>
    );
  }
}
