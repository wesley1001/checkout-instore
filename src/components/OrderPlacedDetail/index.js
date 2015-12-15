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

  handleClickPrintReceipt(){
    if(window.WebViewBridge){
      window.WebViewBridge.send(JSON.stringify({
        type: 'event',
        event: 'printLastTransactionReceipt'
      }));
    }
    else{
      console.warn('WebViewBridge is not defined!');
    }
  }

  render() {
    const { order, customerEmail } = this.props;

    const clientProfile = order.clientProfileData;

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
              <p>E-mail do cliente não foi fornecido.</p> :
              <p>Comprovantes enviados para <br/><strong>
              {customerEmail}
              </strong></p>
            }
            <div>
              { clientProfile.document === '' ?
                ''
                 :
                <p><strong>CPF</strong>: {clientProfile.document}</p>
              }
            </div>
            <p>
              <button onClick={this.handleClickPrintReceipt} className="btn btn-default">Imprimir comprovante</button>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
