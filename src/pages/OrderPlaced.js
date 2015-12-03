import React from 'react';
import cookie from 'react-cookie';

import CheckoutStore from 'stores/CheckoutStore';

import CheckoutActions from 'actions/CheckoutActions';

import Loader from 'components/GeneralLoader';
import Footer from 'components/GeneralFooter';
import OrderPlacedDetail from 'components/OrderPlacedDetail';
import ErrorNotifier from 'components/ErrorNotifier';

import 'styles/orderplaced.less';

export default class OrderPlaced extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkout: CheckoutStore.getState()
    };

    this.onCheckoutChange = this.onCheckoutChange.bind(this);
  }

  componentDidMount() {
    CheckoutStore.listen(this.onCheckoutChange);

    const orderGroupId = this.props.params.orderGroup;
    if(orderGroupId) {
      CheckoutActions.getOrderGroupData.defer(orderGroupId);
    }
    else {
      CheckoutActions.getOrderGroupDataFail({err: 'orderGroup not found in url'}).defer();
    }
  }

  componentWillUnmount() {
    CheckoutStore.unlisten(this.onCheckoutChange);
  }

  onCheckoutChange(state) {
    this.setState({checkout: state});
  }

  render() {
    const {checkout} = this.state;

    return (
      <div className="OrderPlaced component">
        <Loader loading={checkout.get('loading')} />
        <header className="container"></header>

        {checkout.get('orderGroup') === undefined ? '' : <OrderPlacedDetail order={checkout.get('orderGroup')}  customerEmail={checkout.get('customerEmail')}/>}

        <div className="products"></div>

        <button className="btn btn-default btn-lg btn-block btn-bottom">Realizar nova venda</button>

        <ErrorNotifier message={checkout.get('error')} />
        <Footer />
      </div>
    );
  }
}
