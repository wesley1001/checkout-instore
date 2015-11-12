import React, {PropTypes} from 'react';
import _ from 'lodash';

import PaymentOption from 'components/PaymentOption';

import'./index.less';

export default class PaymentList extends React.Component {
  static propTypes = {
    payments: PropTypes.array,
    price: PropTypes.number,
    installments: PropTypes.array
  }

  static defaultProps = {
    payments: [],
    price: 0,
    installments: []
  }

  render() {
    const {payments, price, installments, orderFormId, email} = this.props;

    let paymentsInstore = payments.filter((payment) => payment.id === 45 || payment.id === 44);
    let payOptions = paymentsInstore.map((option) => {
      return (
        <PaymentOption
          key={option.id}
          payment={option}
          price={price}
          installmentOptions={_.find(installments, {'paymentSystem': option.stringId})}
          orderFormId={orderFormId}
          email={email}
        />
      );
    });

    return (
      <section className="PaymentList component">
        {payOptions}
      </section>
    );
  }
}
