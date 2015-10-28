import React, {PropTypes} from 'react';
import {Link} from 'react-router';


export default class ScanIndicator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {ean: ''};

    this.handleChange = this.handleChange.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
  }

  showsBarcodeType() {
    document.getElementById('TypeBarcodeReaderForm').className='text-left';
    document.getElementById('TypeBarcodeReaderShowForm').className='hidden';
    document.getElementById('ScanIndicatorForm').className='text';
  }

  handleChange(e) {
    console.log(e.target.value);
    this.setState({ean: e.target.value});
  }

  checkEmail(e) {
    e.preventDefault();
    window.handleBarcodeRead(this.state.ean);
  }

  render() {
    return (
      <div className="TypeBarcodeReader component">
        <form className="hidden text-left" id="TypeBarcodeReaderForm">
          <div className="form-group">
            <div className="input-group">
              <input
                className="form-control"
                placeholder="Código de barras"
                value={this.state.ean}
                handleChange={this.handleChange}
                autoComplete="off"
              />
              <span className="input-group-btn">
                <button type="submit" className="btn btn-primary" onClick={this.checkEmail}>Adicionar</button>
              </span>
            </div>
          </div>
        </form>
        <div id="TypeBarcodeReaderShowForm" className="productScan">
          <button className="btn btn-default btn-lg btn-block btn-bottom" onClick={this.showsBarcodeType}>Digitar código do produto</button>
        </div>
      </div>
    );
  }
}
