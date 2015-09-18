import React from 'react';

import PaymentList from 'components/PaymentList';
import ProductHelper from 'utils/ProductHelper';

import './index.less';

export default class PaymentSelection extends React.Component {
  static propTypes = {
    products: React.PropTypes.array,
    paymentData: React.PropTypes.object
  }

  static defaultProps = {
    products: [],
    paymentData: {}
  }

  render() {
    const {products, paymentData, orderFormId} = this.props;
    let totalPrice = ProductHelper.calculateTotalPrice(products);

    return (
      <div className="PaymentSelection component">
        <h2 className="title main-title">
          <span className="main-title-name">Pagamento</span>
          <span className="main-title-border"></span>
        </h2>
        <section id="payment" className="list">
          <PaymentList
            payments={paymentData.paymentSystems}
            price={totalPrice}
            installments={paymentData.installmentOptions}
            orderFormId={orderFormId}
          />
        </section>
      </div>
    );
  }
}
