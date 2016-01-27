import React from 'react';

import './index.less';

import bug from 'assets/images/bug.svg';


export default class Notifier extends React.Component {
  static defaultProps = {
    closeButton: true
  };

  constructor(props) {
    super(props);
    this.hideMessage = this.hideMessage.bind(this);
  }

  hideMessage() {
    document.getElementById('notifierContent').className='hidden';
  }

  render() {
    const closeButton = (
      <button className="btn btn-default" onClick={this.hideMessage}>Fechar</button>
    );

    let errorContent = (<span className="error">{this.props.error}</span>);
    let messageContent = (<span className="message">{this.props.message}</span>);

    let content = (
      <div id="notifierContent" className="background">
        <div className="wrapper">
          <img src={bug} width="120"/>
          <br/><br/>
          {this.props.error ? errorContent : ''}
          {!this.props.error && this.props.message ? messageContent : ''}
          <br/><br/>
          {this.props.closeButton ? closeButton : ''}
        </div>
      </div>
    );

    return (
      <div className="Notifier component">
        {this.props.error || this.props.message ? content : ''}
      </div>
    );
  }
}
