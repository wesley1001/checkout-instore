import React from 'react';
import TypeBarcodeReader from 'components/TypeBarcodeReader';

import './index.less';
import pinpad from 'assets/images/Pinpad_Bip.svg';

export default class ScanIndicator extends React.Component {
  render() {
    return (
      <div className="ScanIndicator component">
        <TypeBarcodeReader/>
        <div className="text hidden" id="ScanIndicatorForm"><br/>ou<br/><br/></div>
        <div className="text">Adicione os produtos<br/>utilizando o leitor</div>
        <div className="image-wrapper">
          <img className="image" src={pinpad}/>
        </div>
      </div>
    );
  }
}
