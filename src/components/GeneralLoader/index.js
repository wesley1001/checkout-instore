import React from 'react';

import CartStore from 'stores/CartStore';

import './index.less';
import loader from 'assets/images/loader.svg';

export default class Loader extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      elapsed: 0,
      cartLoading: CartStore.getState('loading').get('loading'),
      start: Date.now()
    };

    this.onCartChange = this.onCartChange.bind(this);
  }

  componentDidMount() {
    CartStore.listen(this.onCartChange);
  }

  componentWillUnmount(){
    CartStore.unlisten(this.onCartChange);
  }

  onCartChange(state) {
    this.setState({cartLoading: state.get('loading')});
    if(this.state.cartLoading){
      this.timer = setInterval(()=>{
        this.setState({
          elapsed: new Date() - this.state.start
        });
      }, 1000);
    }
    else {
      clearInterval(this.timer);
      this.setState({elapsed: 0, start: Date.now()});
    }
  }

  render() {
    console.log('elapsed: ', this.state.elapsed);
    let message = '';
    let smallMessage = '';
    if(this.state.elapsed > 9999){
      message = (
        <span>Por favor, aguarde<br/>mais alguns segundos</span>
      );

      smallMessage = (
        <span>O sistema está<br/>um pouco lento no momento 😣</span>
      );
    }

    let content = (
      <div id="loaderContent" className="background">
        <div className="wrapper">
          <div className="message">{message}</div><br/>
          <img src={loader} width="150"/><br/><br/>
          <div className="message small">{smallMessage}</div>
        </div>
      </div>
    );

    return (
      <div className="Loader component">
        {this.props.loading ? content : ''}
      </div>
    );
  }
}
