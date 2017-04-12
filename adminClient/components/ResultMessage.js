import React from 'react';
export default class ResultMessage extends React.Component {
  constructor(props) {
    super(props);
    this.successMessage = props.sMsg || 'proc success!';
    this.failMessage = props.fMsg || 'proc failed!';
    this.baseStyle = {
      display: 'block', textAlign: 'center', width: '100%', padding: '8px 0px'
    };
    this.successStyle = {
      border: 'solid 2px green'
    };
    this.failStyle = {
      border: 'solid 2px red'
    };
    this.hideStyle = {
      display: 'none'
    };
    this.state = {
      show: false,
      status: false
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.postResult && nextProps.postResult.status === 200) {
      this.setState({show: true, status: true});
    } else if (nextProps.postResult && nextProps.postResult.status !== 200) {
      this.setState({show: true, status: false});
    } else {
      this.setState({show: false, status: false});
    }
  }
  render() {
    const message = this.state.status ? this.successMessage : this.failMessage;
    const style = Object.assign({}, this.baseStyle,
      this.state.status ? this.successStyle : this.failStyle);
    return (
      <div style={this.state.show ? style : this.hideStyle}>
        {message}
      </div>
    );
  }
}