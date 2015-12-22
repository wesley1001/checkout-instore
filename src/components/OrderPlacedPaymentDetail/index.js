import React from 'react';

export default class OrderPlacedPaymentDetail extends React.Component {
  static defaultProps = {
    order: undefined
  }

  constructor(props) {
    super(props);

    this.state = {
      showDetails: false
    };

    this.showInfo = this.showInfo.bind(this);
    this.convertValue = this.convertValue.bind(this);
    this.composeLabel = this.composeLabel.bind(this);
  }

  showInfo() {
    this.setState({showDetails: true});
  }

  convertValue(val) {
    const valueStr = val.toString();
    const pos = valueStr.length - 2;
    return valueStr.slice(0, pos) + ',' + valueStr.slice(pos);
  }
  composeLabel(data){
    if(data === '44'){
      return 'Débito';
    }
    if(data === '45'){
      return 'Crédito';
    }
  }

  render() {
    const { paymentData } = this.props;

    let payments = [];
    let totalValue = 0;

    payments = paymentData.payments.map((payment, index) => {
      totalValue += payment.value;
      const splitVal = payment.value / payment.installments;
      const paymentLabel = this.composeLabel(payment.paymentSystem);
      return (
        <div className='payment-details' key={payment.id} index={index}>
          <p><strong>{payment.installments === 1 ? 'À vista ' :`${payment.installments}x de R$ ${this.convertValue(splitVal)}`}</strong>
          <br/>{paymentLabel}</p>
          {
            this.state.showDetails ?
            <div>
              <p><strong>ID do pagamento</strong>:<br/>{payment.id}</p>
              <p><strong>ID da transação</strong>:<br/> {payment.tid}</p>
            </div>
            :
            <button onClick={this.showInfo} className="btn btn-link">Detalhes da transação</button>
          }
          <hr/>
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
