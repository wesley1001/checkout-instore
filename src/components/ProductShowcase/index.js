import React, {PropTypes} from 'react';
import './index.less';

import CheckoutStore from 'stores/CheckoutStore';
import CheckoutActions from 'actions/CheckoutActions';
import pinpad from 'assets/images/Pinpad_Bip.svg';

import ProductList from 'components/ProductList';
import OrderHeader from 'components/OrderHeader';

export default class ProductShowcase extends React.Component {
  static propTypes = {
    products: PropTypes.array
  }

  static defaultProps = {
    products: []
  }

  render() {
    const {products, orderFormId, history} = this.props;
    console.log('mm: ',this.props.products.length);

    return (
      <section className="ProductShowcase component">
        <OrderHeader />
        {
          products.length > 1 ? '' :
          <div>
            <div className="alert alert-info info">
              <div className="img-wrapper">
                <img className="image" src={pinpad}/>
              </div>
              <div className="text">Utilize um dos botões laterais<br/>para adicionar novos produtos</div>
            </div>
          </div>
        }
        <section>
          <ProductList
            products={products}
            orderFormId={orderFormId}
            history={history}
          />
        </section>
      </section>
    );
  }
}
