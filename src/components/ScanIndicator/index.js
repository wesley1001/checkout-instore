import React from 'react';

import './index.less';
import pinpad from 'assets/images/Pinpad_Bip.svg';
import TypeBarcodeReaderShowButton from 'components/TypeBarcodeReaderShowButton';

export default class ScanIndicator extends React.Component {
  render() {
    return (
      <div className="ScanIndicator component">
        <div className="text hidden" id="ScanIndicatorForm"><br/>ou<br/><br/></div>
        <div className="text">Adicione os produtos<br/>utilizando o leitor</div>
        <div className="image-wrapper">
          <img className="image" src={pinpad}/>
        </div>
        <TypeBarcodeReaderShowButton/>
      </div>
    );
  }
}
