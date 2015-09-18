import React from 'react';

import './index.less';

export default class Receipt extends React.Component {
  render() {
    return (
      <pre className="Receipt component">
        {this.props.data}
      </pre>
    );
  }
}
