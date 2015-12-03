import React from 'react';

export default class OrderPlacedPaymentDetail extends React.Component {
  static defaultProps = {
    order: undefined
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { paymentData } = this.props;

    console.log(paymentData);

    return (
      <div className="OrderPlacedPaymentDetail component">
        <div className="values">
          <h2 className="title-mini">R$ 1.399,90</h2>
          <p>em <strong>3x</strong> de R$ 466,63<br/>VISA crédito</p>
        </div>
      </div>
    );
  }
}
