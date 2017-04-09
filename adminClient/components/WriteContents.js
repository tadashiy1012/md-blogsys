import React from 'react';
import { connect } from 'react-redux';
import {} from 'react-router-redux';
import ReactMarkdown from 'react-markdown';
import { postEntry, rePostResult, editForm } from '../actions';

const WriteContents = (() => {
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
        inTitle: 'no title',
        inBody: 'no body'
      };
    }
    componentWillMount() {
      this.props.handleRePResult();
      this.setState({inTitle: this.props.editValues.title});
      this.setState({inBody: this.props.editValues.body});
    }
    componentWillReceiveProps(nextProps) {
      console.log(this.props, nextProps);
      this.setState({inTitle: nextProps.editValues.title});
      this.setState({inBody: nextProps.editValues.body});
      console.log(this.state);
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
    console.log(editValues);
    if (postResult) {
      console.log(postResult);
      if (postResult.status === 200) {
        alert('post success!');
      } else {
        alert('post failed!');
      }
    }
    return (
      <div>
        <h3>write</h3>
        <FormRoot 
          editValues={editValues}
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
        dispatch(postEntry(title, body));
      },
      handleRePResult: () => {
        dispatch(rePostResult(null));
      },
      handleEdit: (values) => {
        console.log(values);
        dispatch(editForm(values));
      },
    };
  })(Container);
})();

export default WriteContents;