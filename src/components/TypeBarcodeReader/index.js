import React from 'react';
import { Link } from 'react-router';

import CheckoutActions from 'actions/CheckoutActions';
import CheckoutStore from 'stores/CheckoutStore';

export default class TypeBarcodeReader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ean: '',
      checkout: CheckoutStore.getState()
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onCheckoutChange = this.onCheckoutChange.bind(this);
  }

  handleChange(e) {
    this.setState({ean: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    CheckoutActions.findProduct(this.state.ean);
  }

  onCheckoutChange(state) {
    let newState = {
      checkout: state
    };

    if(state.get('error') === '' && state.get('loading') === false){
      newState.ean = '';
      CheckoutActions.hideTypeBarReaderForm.defer();
    }

    this.setState(newState);
  }

  componentDidMount() {
    CheckoutStore.listen(this.onCheckoutChange);
  }

  componentWillUnmount() {
    CheckoutStore.unlisten(this.onCheckoutChange);
  }

  componentDidUpdate() {
    let showTypeBarReaderForm = this.state.checkout.get('showTypeBarReaderForm');
    if (showTypeBarReaderForm && this.refs.barcodeInputType) {
      this.refs.barcodeInputType.focus();
    }
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
