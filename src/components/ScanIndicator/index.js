import React from 'react';

import './index.less';
import pinpad from 'assets/images/Pinpad_Bip.svg';

export default class ScanIndicator extends React.Component {
  render() {
    return (
      <div className="ScanIndicator component">
        <div className="text">Adicione os produtos utilizando o leitor</div>
        <div className="image-wrapper">
          <img className="image" src={pinpad}/>
        </div>
        <div className="productScan">
          <button className="btn btn-default btn-lg btn-block btn-bottom">Digite o código do produto</button>
        </div>
      </div>
    );
  }
}
