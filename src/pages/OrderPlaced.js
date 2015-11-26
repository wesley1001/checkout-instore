import React from 'react';
import cookie from 'react-cookie';

import CheckoutStore from 'stores/CheckoutStore';
import CartStore from 'stores/CartStore';
import VendorStore from 'stores/VendorStore';

import CartActions from 'actions/CartActions';
import VendorActions from 'actions/VendorActions';

import UserAuthentication from 'components/UserAuthentication';
import Loader from 'components/GeneralLoader';
import Footer from 'components/GeneralFooter';
import ErrorNotifier from 'components/ErrorNotifier';

import ProductShowcase from 'components/ProductShowcase';

import 'styles/orderplaced.less';
import check from 'assets/images/icon-check.svg';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkout: CheckoutStore.getState(),
      cart: CartStore.getState(),
      vendor: VendorStore.getState()
    };
  }

  render() {
    const {cart, checkout} = this.state;
    const orderForm = cart.get('orderForm');

    return (
      <div className="OrderPlaced component">
        <Loader loading={cart.get('loading') || checkout.get('loading')} />
        <header className="container"></header>

        <div className="text-center">
          <div className="title-highlight-wrapper">
            <img src={check} width="80"/>
            <h1 className="title-highlight">Venda confirmada!</h1>
          </div>

          <div className="values">
            <h2 className="title-mini">R$ 1.399,90</h2>
            <p>em <strong>3x</strong> de R$ 466,63<br/>VISA crédito</p>
          </div>

          <hr/>

          <div className="receipts">
            {this.state.checkout.get('customerEmail') === '' ?
              '' :
              <p>Comprovantes enviados para <br/><strong>
              {this.state.checkout.get('customerEmail')}
              </strong></p>
            }
            <p>
              <button className="btn btn-default">Imprimir comprovantes</button>
            </p>
          </div>

          <hr/>

          <div>
            <p><strong>CPF</strong>: 045.334.923-01</p>
            <p><strong>TID</strong>: 295C7B9C78834988992AE27EC678C261</p>
          </div>

        </div>

        <div className="products"></div>

        <button className="btn btn-default btn-lg btn-block btn-bottom">Realizar nova venda</button>

        <ErrorNotifier message={cart.get('error') || checkout.get('error')} />
        <Footer />
      </div>
    );
  }
}
