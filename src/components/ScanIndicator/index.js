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
          <div className="button-ref"></div> 
        </div>
      </div>
    );
  }
}
