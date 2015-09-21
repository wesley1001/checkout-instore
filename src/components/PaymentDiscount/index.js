import React, {PropTypes} from 'react';

export default class PaymentDiscount extends React.Component {
  static propTypes = {
    value: PropTypes.number
  }

  static defaultProps = {
      value: 0
  }

  constructor(props) {
    super(props);

    this.composeInstallmentMessage = this.composeInstallmentMessage.bind(this);
  }

  composeInstallmentMessage() {
    const {value} = this.props;

    if(value <= 0) {
      return '';
    }

    return (
      <small>com -{value * 100}%</small>
    );
  }

  render() {
    let installmentMessage = this.composeInstallmentMessage();

    return (
      <div className="PaymentDiscount component text-muted">
        {installmentMessage}
      </div>
    );
  }
}
