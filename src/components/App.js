import React from 'react';

import 'styles/main.less';

import checkConnection from 'utils/CheckConnection';
import setViewport from 'utils/SetViewport';

@setViewport
@checkConnection
export default class App extends React.Component {
  render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}
