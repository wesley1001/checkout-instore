import React, {PropTypes} from 'react';

import PaymentList from 'components/PaymentList';
import ProductHelper from 'utils/ProductHelper';

import './index.less';

export default class PaymentSelection extends React.Component {
  static propTypes = {
    products: PropTypes.array,
    paymentData: PropTypes.object
  }

  static defaultProps = {
    products: [],
    paymentData: {}
  }

  render() {
    const {products, paymentData, orderFormId, email} = this.props;
    let totalPrice = ProductHelper.calculateTotalPrice(products);
    let originalPrice = ProductHelper.calculateOriginalPrice(products);

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
            originalPrice={originalPrice}
            installments={paymentData.installmentOptions}
            orderFormId={orderFormId}
            email={email}
          />
        </section>
      </div>
    );
  }
}
