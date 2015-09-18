import React from 'react';

import './index.less';  

export default class PaymentLabel extends React.Component {
  static propTypes = {
    iconLabel: React.PropTypes.string,
    iconClass: React.PropTypes.string,
    discount: React.PropTypes.number
  }

  constructor(props) {
    super(props);

    this.composeDiscount = this.composeDiscount.bind(this);
  }

  composeDiscount() {
    const {discount} = this.props;

    if(discount > 0) {
      return (<span className="discount label label-success">{discount * 100}%</span>);
    } else {
      return '';
    }
  }

  composeClass() {
    if(this.props.type === 'credit') {
      return {
        itemIcon: 'icon icon-credit',
        itemName: 'name item-credit'
      };
    }

    if(this.props.type === 'debit') {
      return {
        itemIcon: 'icon icon-debit',
        itemName: 'name item-debit'
      };
    }
  }

  render() {
    const {iconClass, iconLabel} = this.props;
    let discountValue = this.composeDiscount();
    let {itemIcon, itemName} = this.composeClass();

    return (
      <div className= "PaymentLabel component">
        <div className={itemIcon}>
          <i className={'fa ' + iconClass}></i>
        </div>
        <div className={itemName}>
          {iconLabel} {discountValue}
        </div>
      </div>
    );
  }
}
