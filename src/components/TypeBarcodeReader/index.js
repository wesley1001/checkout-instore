import React from 'react';
import { Link } from 'react-router';

import CheckoutActions from 'actions/CheckoutActions';

export default class ScanIndicator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ean: '',
      isHidden: true
    };

    this.showsBarcodeType = this.showsBarcodeType.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  showsBarcodeType() {
    this.setState({isHidden: false});
    setTimeout(()=>
      this.refs.barcodeInputType.focus()
    ,200);
  }

  handleChange(e) {
    this.setState({ean: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();

    CheckoutActions.findProduct(this.state.ean);
    this.setState({
      ean: '',
      isHidden: true
    });
  }

  render() {
    if(this.state.isHidden === true){
      return (
        <div className="productScan">
          <button
            className="btn btn-default btn-lg btn-block btn-bottom"
            onClick={this.showsBarcodeType}>
            Digitar código do produto
          </button>
        </div>
      );
    }
    else {
      return (
        <div className="TypeBarcodeReader component">
          <form className="text-left" onSubmit={this.handleSubmit}>
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
}
