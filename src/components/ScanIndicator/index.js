import React from 'react';

import './index.less';
import pinpad from 'assets/images/Pinpad_Bip.svg';

export default class ScanIndicator extends React.Component {
  render() {
    return (
      <div className="ScanIndicator component">
        <div className="image-wrapper">
          <div className="barcode-laser hide">
            <span className="barcode-laser-light"></span>
            <span className="barcode-laser-light"></span>
            <span className="barcode-laser-light"></span>
            <span className="barcode-laser-light"></span>
            <span className="barcode-laser-light"></span>
          </div>

          <div className="barcode-laser-bar"></div>

          <div className="barcode-line">
            <div className="on"></div>
            <div className="off"></div>
            <div className="starter-bg"></div>
            <div className="starter"></div>
          </div>

          <div className="barcode-line-up">
            <div className="on"></div>
            <div className="off"></div>
          </div>

          <div className="barcode-button barcode-button-left"></div>
          <div className="barcode-button barcode-button-right"></div>
        </div>
      </div>
    );
  }
}
