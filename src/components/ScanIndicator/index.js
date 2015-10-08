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
          <div className="button-ref button-ref-left"></div> 
          <div className="button-ref button-ref-right"></div> 
        </div>
      </div>
    );
  }
}
