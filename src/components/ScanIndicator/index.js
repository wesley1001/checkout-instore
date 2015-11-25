import React from 'react';

import './index.less';
import pinpad from 'assets/images/Pinpad_Bip.svg';
import CheckoutStore from 'stores/CheckoutStore';
import TypeBarcodeReaderShowButton from 'components/TypeBarcodeReaderShowButton';
import TypeBarcodeReader from 'components/TypeBarcodeReader';

export default class ScanIndicator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkout: CheckoutStore.getState()
    };

    this.onCheckoutChange = this.onCheckoutChange.bind(this);
  }

  onCheckoutChange(state) {
    this.setState({checkout: state});
  }

  componentDidMount() {
    CheckoutStore.listen(this.onCheckoutChange);
  }

  componentWillUnmount() {
    CheckoutStore.unlisten(this.onCheckoutChange);
  }

  render() {
    let showTypeBarReaderForm = this.state.checkout.get('showTypeBarReaderForm');
    let alternativeText;

    if (showTypeBarReaderForm) {
      alternativeText = (<div className="text" id="ScanIndicatorForm"><br/>ou<br/><br/></div>);
    } else {
      alternativeText = null;
    }

    return (
      <div className="ScanIndicator component">
        <TypeBarcodeReader/>
        {alternativeText}
        <div className="text">Adicione os produtos<br/>utilizando o leitor</div>
        <div className="image-wrapper">
          <img className="image" src={pinpad}/>
        </div>
        <TypeBarcodeReaderShowButton/>
      </div>
    );
  }
}
