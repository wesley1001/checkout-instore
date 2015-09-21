import React from 'react';
import DocumentTitle from 'react-document-title';

import 'styles/main.less';

export default class App extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
