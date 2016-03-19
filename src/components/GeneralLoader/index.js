import React, {PropTypes} from 'react';

import './index.less';
import loader from 'assets/images/loader.svg';

export default class Loader extends React.Component {

  static propTypes = {
    waitToShow: PropTypes.number
  }

  static defaultProps = {
    waitToShow: 0
  }

  constructor(props) {
    super(props);

    this.state = {
      seconds: 0,
      timer: null,
      loading: false,
      hideTimeout: null
    };
  }

  componentWillReceiveProps(nextProps) {
    let loading = nextProps.loading;
    if(loading){
      this.setState({loading: true});
      clearTimeout(this.state.hideTimeout);
      clearInterval(this.state.timer);
      let timer = setInterval(()=>{
        this.setState({
          seconds: this.state.seconds+1
        });
      }, 1000);
      this.setState({
        timer: timer
      });
    }
    else {
      clearInterval(this.state.timer);
      this.setState({seconds: 0, timer: null});

      let hideTimeout = setTimeout(() => {
        this.setState({loading: false})
      }, 200);
      this.setState({
        hideTimeout: hideTimeout
      });
    }
  }

  componentWillUnmount(){
    clearInterval(this.state.timer);
    clearTimeout(this.state.hideTimeout);
  }

  composeContent(message, smallMessage, content) {
    if(this.state.seconds >= 10){
      message = (
        <span>Por favor, aguarde<br/>mais alguns segundos</span>
      );
      smallMessage = (
        <span>O sistema está<br/>um pouco lento no momento 😣</span>
      );
    }

    if(this.state.seconds >= this.props.waitToShow){
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
        {this.state.loading ? this.composeContent(message, smallMessage, content) : ''}
      </div>
    );
  }
}
