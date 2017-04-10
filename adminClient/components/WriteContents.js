import React from 'react';
import { connect } from 'react-redux';
import {} from 'react-router-redux';
import ReactMarkdown from 'react-markdown';
import { postEntry, rePostResult, editForm } from '../actions';

const WriteContents = (() => {
  class ResultMessage extends React.Component {
    constructor(props) {
      super(props);
      this.successMessage = 'post success!';
      this.failMessage = 'post failed!';
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
  class WriteForm extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <div>
          <label>input title</label><br />
          <input type='text' value={this.props.inTitle} style={{width: '100%'}} onChange={(e) => {
            this.props.handleEdit({title: e.target.value, body: this.props.inBody});
          }} />
          <br />
          <label>input body</label><br />
          <textarea value={this.props.inBody} style={{width: '100%'}} rows='5' onChange={(e) => {
            this.props.handleEdit({title: this.props.inTitle, body: e.target.value});
          }} ></textarea>
        </div>
      );
    }
  }
  class FormRoot extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        inTitle: props.editValues.title,
        inBody: props.editValues.body
      };
    }
    componentWillReceiveProps(nextProps) {
      this.setState({inTitle: nextProps.editValues.title});
      this.setState({inBody: nextProps.editValues.body});
    }
    render() {
      return (
        <div>
          <WriteForm handleEdit={this.props.handleEdit}
            inTitle={this.state.inTitle} inBody={this.state.inBody} />
          <label>preview</label><br />
          <div style={{'border':'solid 1px #888'}}>
            <ReactMarkdown source={this.state.inBody} />
          </div>
          <hr />
          <button onClick={(e) => {
            e.preventDefault();
            this.props.handlePostEntry(
              this.state.inTitle, this.state.inBody);
          }}>submit</button>
        </div>
      );
    }
  }
  const Container = ({editValues, postResult, handlePostEntry, handleEdit}) => {
    return (
      <div>
        <h3>write</h3>
        <ResultMessage postResult={postResult} />
        <FormRoot 
          editValues={editValues}
          handleEdit={handleEdit}
          handlePostEntry={handlePostEntry} />       
      </div>
    );
  };
  return connect((state, props) => {
    return {
      postResult: state.reducer.postResult,
      editValues: state.reducer.editForm
    };
  }, (dispatch) => {
    return {
      handlePostEntry: (title, body) => {
        dispatch(postEntry(title, body));
      },
      handleEdit: (values) => {
        dispatch(editForm(values));
        dispatch(rePostResult(null));
      },
    };
  })(Container);
})();

export default WriteContents;