import React from 'react';

import OrderPlacedPaymentDetail from 'components/OrderPlacedPaymentDetail';

import check from 'assets/images/icon-check.svg';

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
    const { order } = this.props;

    const clientProfile = order.clientProfileData;
    const document = clientProfile.document;

    return (
      <div className="OrderPlacedDetail component">
        <div className="text-center">
          <div className="title-highlight-wrapper">
            <img src={check} width="80"/>
            <h1 className="title-highlight">Venda confirmada!</h1>
          </div>

          <OrderPlacedPaymentDetail paymentData={order.paymentData} />

          <div className="receipts">
            { clientProfile.email.indexOf('@vtex-instore.com') > 0 ?
              <p>E-mail do cliente não foi fornecido.</p> :
              <p>Comprovantes enviados para <br/><strong>
              {clientProfile.email}
              </strong></p>
            }
            <div>
              { document ?
                <p><strong>CPF</strong>: {`${document.slice(0, 3)}.${document.slice(3, 6)}.${document.slice(6, 9)}-${document.slice(9,11)}`}</p>
                :
                ''
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
