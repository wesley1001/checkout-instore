import React from 'react';

export default class OrderPlacedPaymentDetail extends React.Component {
  static defaultProps = {
    order: undefined
  }

  constructor(props) {
    super(props);
  }

  convertValue(val) {
    const valueStr = val.toString();
    const pos = valueStr.length - 2;
    return valueStr.slice(0, pos) + ',' + valueStr.slice(pos);
  }

  render() {
    const { paymentData } = this.props;

    let payments = [];
    let totalValue = 0;

    payments = paymentData.payments.map((payment, index) => {
      totalValue += payment.value;
      const splitVal = payment.value / payment.installments;
      return (
        <div className='payment-details' key={payment.id} index={index}>
          <p>em <strong>{payment.installments}x</strong> de R${this.convertValue(splitVal)}<br/>{payment.paymentSystemName}</p>
          <p><strong>ID da transação</strong>: {payment.id}</p>
          <p><strong>TID</strong>: {payment.tid}</p>
        </div>
      );
    });

    return (
      <div className="OrderPlacedPaymentDetail component">
        <div className="values">
          <h2 className="title-mini">R$ {this.convertValue(totalValue)}</h2>
          {payments}
        </div>
      </div>
    );
  }
}
