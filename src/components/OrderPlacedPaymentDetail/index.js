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
  composeLabel(data){
    if(data === 'Venda Direta Debito'){
      return 'Débito';
    }
    if(data === 'Venda Direta Credito'){
      return 'Crédito';
    }
  }

  render() {
    const { paymentData } = this.props;

    console.log(paymentData);

    let payments = [];
    let totalValue = 0;

    payments = paymentData.payments.map((payment, index) => {
      totalValue += payment.value;
      const splitVal = payment.value / payment.installments;
      const paymentLabel = this.composeLabel(payment.paymentSystemName);
      return (
        <div className='payment-details' key={payment.id} index={index}>
          <p><strong>{payment.installments === 1 ? 'À vista ' :`${payment.installments}x de`}</strong> R${this.convertValue(splitVal)}
          <br/>{paymentLabel}</p>
          <strong>ID da transação</strong>:<br/>
          {payment.id.length <= 16 ? payment.id : <span>{payment.id.substring(0,16)}<br/>{payment.id.substring(17,payment.id.length)}</span>}
          <br/><br/>
          <p><strong>TID</strong>:<br/> {payment.tid}</p>
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
