import React from 'react';

import './index.less';

export default class ErrorNotifier extends React.Component {
  render() {
    const message = (
      <div className="wrapper">
        <span className="message">{this.props.message}</span>
      </div>
    );

    return (
      <div className="ErrorNotifier component">
        {this.props.message ? message : ''}
      </div>
    );
  }
}
