import React from 'react';

import './index.less';
import pinpad from 'assets/images/Pinpad_Bip.svg';

export default class ScanIndicator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {ean: ''};

    this.handleChange = this.handleChange.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
  }

  showsBarcodeType() {
    document.getElementById('loga').className='input-group';
    document.getElementById('texto').className='hidden';
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
      <div className="ScanIndicator component">
      <div className="hidden" id="loga">
        <input
          className="form-control"
          placeholder="Digite o codigo de barras"
          value={this.state.ean}
          handleChange={this.handleChange}
          autoComplete="off"
        />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-primary" onClick={this.checkEmail}>OK</button>
        </span>
      </div>
        <div className="text" id="texto">Adicione os produtos utilizando o leitor</div>
        <div className="image-wrapper">
          <img className="image" src={pinpad}/>
        </div>
      <div className="productScan">
        <button className="btn btn-default btn-lg btn-block btn-bottom" onClick={this.showsBarcodeType}>Digite o código do produto</button>
        </div>
      </div>
    );
  }
}
