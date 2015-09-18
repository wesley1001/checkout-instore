import React from 'react';

import './index.less';

export default class Loader extends React.Component {
  render() {
    const spinner = (
      <div className="wrapper">
        <i className="spinner fa fa-spinner fa-pulse fa-3x fa-fw"></i>
      </div>
    );

    return (
      <div className="GeneralLoader component">
        {this.props.loading ? spinner : ''}
      </div>
    );
  }
}
