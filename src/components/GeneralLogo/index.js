import React from 'react';
import {Link} from 'react-router';

import logo_instore from 'assets/images/Logo_inStore.svg';

import './index.less';

export default class Logo extends React.Component {
  render () {
    return (
      <div className="GeneralLogo component">
        <Link to="/" className="logo"><img src={logo_instore}/></Link>
      </div>
    );
  }
}
