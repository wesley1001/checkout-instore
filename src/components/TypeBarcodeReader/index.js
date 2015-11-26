import React from 'react';
import { Link } from 'react-router';

import CheckoutActions from 'actions/CheckoutActions';

export default class TypeBarcodeReader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ean: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ean: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();

    CheckoutActions.findProduct(this.state.ean);
    this.setState({
      ean: ''
    });
  }

  render() {
    return (
      <div className="TypeBarcodeReader component container">
        <form className="text-left" id="TypeBarcodeReaderForm" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <div className="input-group">
              <input
                className="form-control"
                placeholder="Código de barras"
                value={this.state.ean}
                onChange={this.handleChange}
                autoComplete="off"
                type="tel"
                ref="barcodeInputType"
              />
              <span className="input-group-btn">
                <button type="submit" className="btn btn-primary">Adicionar</button>
              </span>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
