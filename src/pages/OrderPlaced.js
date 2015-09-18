import React from 'react';

import Receipt from 'components/Receipt';
import ReceiptShare from 'components/ReceiptShare';

export default class OrderPlaced extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      receipt: '.....S.O.F.T.W.A.R.E.E.X.P.R.E.S.S....\nLA                              Rede 5\nDO               Codigo transacao: 200\n.....S...I...M...U...L...A...D...O....\nSI               Codigo operacao: 3000\nMU                        Valor: 24,70\nLA                    NSU SiTef: 30012\nDO                      03/07/15 15:57\n.....S...I...M...U...L...A...D...O....\nSI                    ID PDV: IP000001\nMU             Estab.: 000000000000005\nLA         Transacao Simulada Aprovada\nDO                     Host: 999030012\n.....S...I...M...U...L...A...D...O....\n                               (SiTef)\n'
    };
  }

  render() {
    return (
      <div className="container text-center">
        <h2>Pagamento realizado!</h2>
        <Receipt data={this.state.receipt}/>
        <ReceiptShare/>
      </div>
    );
  }
}
