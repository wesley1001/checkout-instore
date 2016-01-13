import React from 'react';

import './index.less';
import loader from 'assets/images/loader.svg';

export default class Loader extends React.Component {

  showLoader(){
    if(window.WebViewBridge){
      window.WebViewBridge.send(JSON.stringify({
        type: 'event',
        event: 'showLoader'
      }));
    }
  }

  hideLoader(){
    if(window.WebViewBridge){
      window.WebViewBridge.send(JSON.stringify({
        type: 'event',
        event: 'hideLoader'
      }));
    }
  }

  componentDidMount(){
    if(this.props.loading){
      this.showLoader();
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.loading != this.props.loading){
      if(this.props.loading === true){
        this.showLoader();
      }
      else{
        this.hideLoader();
      }
    }
  }

  render() {
    if(window.WebViewBridge){
      return (<div></div>);
    }
    else{
      const spinner = (
        <div className="wrapper">
          <img className="spinner" src={loader} width="120"/>
        </div>
      );

      return (
        <div className="GeneralLoader component">
          {this.props.loading ? spinner : ''}
        </div>
      );
    }
  }
}
