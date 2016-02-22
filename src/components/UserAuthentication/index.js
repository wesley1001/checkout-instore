import React from 'react';

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
        CheckoutActions.setClientData(this.state.email);
        this.props.history.pushState(null, '/shop');
      }
    }
  }

  componentDidMount() {
    if (this.props.getFocus) {
      this.refs.email.focus();
    }
  }

  render() {
    return (
      <div className="container">
        <form className="form-horizontal text-center" onSubmit={this.handleSubmit}>
          <div className="btn-block">
            <input id="email"
              className="form-control"
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
              autoComplete="off"
              ref="email"
            />
            <span>
              <button type="submit" className="btn btn-primary btn-block identification">Identificar cliente</button>
            </span>
          </div>
        </form>
      </div>
    );
  }
}
