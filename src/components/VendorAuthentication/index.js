import React from 'react';
import {Link} from 'react-router';

import VendorActions from 'actions/VendorActions';
import './index.less';

export default class VendorAuthentication extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id:''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({id: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();

    VendorActions.SetVendorData(this.state.id);
  }

  render() {
    return (
      <div className="VendorAuthentication component">
        <h2 className="title main-title">
          <span className="main-title-name">Vendedor</span>
          <span className="main-title-border"></span>
        </h2>

        <div className="container">
          <form className="text-center" onSubmit={this.handleSubmit}>
            <div className="input-group">
              <input id="vendor-id"
                className="form-control"
                type="text"
                placeholder="Identificação"
                value={this.state.id}
                onChange={this.handleChange}
                autoComplete="off"
              />
              <span className="input-group-btn">
                <button type="submit" className="btn btn-primary">Entrar</button>
              </span>
            </div>
          </form>
          <span className="help-block">Identifique-se para efetuar vendas em seu nome.</span>
        </div>
      </div>
    );
  }
}
