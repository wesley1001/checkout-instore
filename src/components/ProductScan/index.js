import React from 'react';

import pinpad from 'assets/images/Pinpad_Bip.svg';

export default class ScanIndicator extends React.Component {
  render() {
    return (
      <div className="ProductScan component">
        <div className="text">Adicione os produtos utilizando o leitor</div>
        <div className="image-wrapper">
          <img className="image" src={pinpad}/>
        </div>
      </div>
    );
  }
}
