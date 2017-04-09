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
      this.style = {
        textAlign: 'center',
        width: '100%',
        padding: '8px 0px'
      };
      this.successStyle = {
        border: 'solid 2px green'
      };
      this.failStyle = {
        border: 'solid 2px red'
      };
      this.state = {
        toggle: props.toggle
      };
    }
    render() {
      const style = Object.assign({}, this.style, this.state.toggle ? this.successStyle : this.failStyle);
      return (
        <div style={style}>
          {this.state.toggle ? this.successMessage : this.failMessage}
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
    componentWillMount() {
      this.props.handleRePResult();
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
  const Container = ({editValues, postResult, handlePostEntry, handleRePResult, handleEdit}) => {
    let msg = null;
    let flag = false;
    if (postResult && postResult.status === 200) {
      msg = (<ResultMessage toggle={true} />);
    } else if (postResult && postResult.status !== 200) {
      msg = (<ResultMessage toggle={false} />);
    } else {
      msg = null;
    }
    return (
      <div>
        <h3>write</h3>
        {msg}
        <FormRoot 
          editValues={editValues}
          postResult={postResult}
          handleEdit={handleEdit}
          handleRePResult={handleRePResult}
          handlePostEntry={handlePostEntry} />       
      </div>
    );
  };
  return connect((state, props) => {
    console.log(state);
    return {
      postResult: state.reducer.postResult,
      editValues: state.reducer.editForm
    };
  }, (dispatch) => {
    return {
      handlePostEntry: (title, body) => {
        console.log(title, body);
        dispatch(postEntry(title, body));
      },
      handleRePResult: () => {
        dispatch(rePostResult(null));
      },
      handleEdit: (values) => {
        dispatch(editForm(values));
      },
    };
  })(Container);
})();

export default WriteContents;