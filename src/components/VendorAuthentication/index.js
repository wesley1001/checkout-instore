import React from 'react';
import {Link} from 'react-router';

import VendorActions from 'actions/VendorActions';
import './index.less';
import user from 'assets/images/user.svg';


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
      <div className="img-box">
        <img src={user} className="img"/>
      </div>
        <h2 className="title main-title">
          <span className="main-title-name name">Vendedor</span>
          <span className="main-title-border border"></span>
        </h2>

        <div className="container">
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="form-group btn-block container">
              <input id="vendor-id"
                className="form-control"
                type="text"
                placeholder="Identificação"
                value={this.state.id}
                onChange={this.handleChange}
                autoComplete="off"
              />
              <span className="">
                <button type="submit" className="btn btn-success btn-block enter">Entrar</button>
              </span>
            </div>
          </form>
          <div className="help-block container">
            <p><Link to="/cart" className="ask" onClick={this.handleClick}>Não possui identificação?</Link></p>
          </div>
          <span className="help-block container">Peça sua identificação ao seu gerente, ela é usada para você acompanhar as suas vendas.</span>
        </div>
      </div>
    );
  }
}
