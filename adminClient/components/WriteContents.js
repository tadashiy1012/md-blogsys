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
  let input = '';
  let inTitle = 'no title';
  let inBody = 'no body';
  let result = null;
  const Container = ({formVal, postResult, handlePostEntry, handleRePResult}) => {
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
      }
      handleRePResult();
    }
    return (
      <div>
        <h3>write</h3>
        <WriteForm />
        <div>
          <label>preview</label><br />
          <div style={{'border':'solid 1px #888'}}>
            <ReactMarkdown source={input} />
          </div>
        </div>
        <hr />
        <button onClick={(e) => {
          e.preventDefault();
          handlePostEntry(inTitle, inBody);
        }}>submit</button>
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