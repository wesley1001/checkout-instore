import React from 'react';

import './index.less';

import bug from 'assets/images/bug.svg';


export default class ErrorNotifier extends React.Component {
  constructor(props) {
    super(props);

    this.hideMessage = this.hideMessage.bind(this);
  }

  hideMessage() {
    document.getElementById('errorMessage').className='hidden';
  }

  render() {
    const message = (
      <div id="errorMessage" className="background">
        <div className="wrapper">
          <img src={bug} width="120"/><br/><br/>
          <span className="message">{this.props.message}</span><br/><br/>
          <button className="btn btn-default" onClick={this.hideMessage}>Fechar</button>
        </div>
      </div>
    );

    return (
      <div className="ErrorNotifier component">
        {this.props.message ? message : ''}
      </div>
    );
  }
}
