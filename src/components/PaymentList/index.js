import React from 'react';
import _ from 'lodash';

import PaymentOption from 'components/PaymentOption';

import'./index.less';

export default class PaymentList extends React.Component {
  static propTypes = {
    payments: React.PropTypes.array,
    price: React.PropTypes.number,
    installments: React.PropTypes.array
  }

  static defaultProps = {
    payments: [],
    price: 0,
    installments: []
  }

  render() {
    const {payments, price, installments,orderFormId} = this.props;

    let paymentsInstore = payments.filter((payment) => payment.id === 45 || payment.id === 44);
    let payOptions = paymentsInstore.map((option) => {
      return (
        <PaymentOption
          key={option.id}
          payment={option}
          price={price}
          installmentOptions={_.find(installments, {'paymentSystem': option.stringId})}
          orderFormId={orderFormId}
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
