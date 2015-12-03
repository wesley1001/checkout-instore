import React from 'react';

import OrderPlacedPaymentDetail from 'components/OrderPlacedPaymentDetail';

import check from 'assets/images/icon-check.svg';
import './index.less';

export default class OrderPlacedDetail extends React.Component {
  static defaultProps = {
    order: undefined
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { order, customerEmail } = this.props;

    return (
      <div className="OrderPlacedDetail component">
        <div className="text-center">
          <div className="title-highlight-wrapper">
            <img src={check} width="80"/>
            <h1 className="title-highlight">Venda confirmada!</h1>
          </div>
          <OrderPlacedPaymentDetail paymentData={order.paymentData} />

          <div className="receipts">
            { customerEmail === '' ?
              '' :
              <p>Comprovantes enviados para <br/><strong>
              {customerEmail}
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
      </div>
    );
  }
}
