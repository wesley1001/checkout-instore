import React from 'react';

import './index.less';
import loader from 'assets/images/loader.svg';

export default class Loader extends React.Component {
  render() {
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
