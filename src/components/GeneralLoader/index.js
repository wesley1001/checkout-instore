import React from 'react';

import './index.less';
import loader from 'assets/images/loader.svg';

export default class Loader extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      elapsed: 0,
      start: Date.now()
    };
  }

  componentWillReceiveProps(nextProps) {
    let loading = nextProps.loading;
    if(loading){
      this.timer = setInterval(()=>{
        this.setState({
          elapsed: new Date() - this.state.start
        });
      }, 500);
    }
    else {
      clearInterval(this.timer);
      this.setState({elapsed: 0, start: Date.now()});
    }
  }

  componentWillUpdate() {
    this.render();
  }

  composeContent(message, smallMessage, content) {
    if(this.state.elapsed > 9999){
      message = (
        <span>Por favor, aguarde<br/>mais alguns segundos</span>
      );
      smallMessage = (
        <span>O sistema está<br/>um pouco lento no momento 😣</span>
      );
    }

    if(this.state.elapsed > 999){
      content = (
        <div id="loaderContent" className="background">
          <div className="wrapper">
            <div className="message">{message}</div><br/>
            <img src={loader} width="150"/><br/><br/>
            <div className="message small">{smallMessage}</div>
          </div>
        </div>
      );
    }
    return content;
  }

  render() {
    let message = '';
    let smallMessage = '';
    let content = '';

    return (
      <div className="Loader component">
        {this.props.loading ? this.composeContent(message, smallMessage, content) : ''}
      </div>
    );
  }
}
