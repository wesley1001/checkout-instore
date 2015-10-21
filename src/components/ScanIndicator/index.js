import React from 'react';

import './index.less';
import pinpad from 'assets/images/Pinpad_Bip.svg';

export default class ScanIndicator extends React.Component {
  render() {
    return (
      <div className="ScanIndicator component">
        <div className="barcode-laser-bar"></div>

        <div className="barcode-button barcode-button-left"></div>
        <div className="barcode-button barcode-button-right"></div>

        <div className="barcode-message">
          <h2 className="title">Pressione os botões laterais</h2>
          <div className="subtitle">para adicionar produtos</div>
        </div>
      </div>
    );
  }
}
