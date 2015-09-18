import React from 'react';
import DocumentTitle from 'react-document-title';
import { RouteHandler } from 'react-router';

import 'styles/main.less';

export default class App extends React.Component {
  render() {
    return (
      <DocumentTitle title="Instore">
        <RouteHandler/>
      </DocumentTitle>
    );
  }
}
