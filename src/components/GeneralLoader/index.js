import React from 'react';

import './index.less';
import loader from 'assets/images/loader.svg';

export default class Loader extends React.Component {
  render() {
    let message = (
      <span>Por favor, aguarde<br/>mais alguns segundos</span>
    );

    let smallMessage = (
      <span>O sistema está<br/>um pouco lento no momento 😣</span>
    );

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
