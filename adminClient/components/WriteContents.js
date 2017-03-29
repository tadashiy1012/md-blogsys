import React from 'react';
import { connect } from 'react-redux';
import {} from 'react-router-redux';
import { Field, reduxForm } from 'redux-form';
import ReactMarkdown from 'react-markdown';
import { postEntry, rePostResult } from '../actions';

const WriteContents = (() => {
  const WriteForm = reduxForm({form: 'write'})(({}) => {
    return (
      <div>
        <label>input title</label>
        <br />
        <Field name='inTitle' component='input' type='text' style={{width: '100%'}} />
        <br />
        <label>input body</label>
        <br />
        <Field name='inBody' component='textarea' type='text' style={{width: '100%', height: '130px'}} />
      </div>
    );
  });
  class FormRoot extends React.Component {
    constructor(props) {
      super(props);
    }
    componentWillMount() {
      this.props.handleRePResult();
    }
    render() {
      return (
        <div>
          <WriteForm />
          <label>preview</label><br />
          <div style={{'border':'solid 1px #888'}}>
            <ReactMarkdown source={this.props.values.input} />
          </div>
          <hr />
          <button onClick={(e) => {
            e.preventDefault();
            this.props.handlePostEntry(
              this.props.values.inTitle, this.props.values.inBody);
          }}>submit</button>
        </div>
      );
    }
  }
  const Container = ({formVal, postResult, handlePostEntry, handleRePResult}) => {
    let input = '';
    let inTitle = 'no title';
    let inBody = 'no body';
    if (formVal.write) {
      if (formVal.write.values && formVal.write.values.inBody) {
        inBody = input = formVal.write.values.inBody;
      }
      if (formVal.write.values && formVal.write.values.inTitle) {
        inTitle = formVal.write.values.inTitle;
      }
      if (input && (!formVal.write.values || !formVal.write.values.inBody)) {
        input = '';
        inBody = 'no body';
        if (!formVal.write.values.inTitle) {
          inTitle = 'no title';
        }
      }
    }
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
          values={{input, inTitle, inBody}}
          handleRePResult={handleRePResult}
          handlePostEntry={handlePostEntry} />       
      </div>
    );
  };
  return connect((state, props) => {
    return {
      formVal: state.form,
      postResult: state.reducer.postResult
    };
  }, (dispatch) => {
    return {
      handlePostEntry: (title, body) => {
        dispatch(postEntry(title, body));
      },
      handleRePResult: () => {
        dispatch(rePostResult(null));
      }
    };
  })(Container);
})();

export default WriteContents;