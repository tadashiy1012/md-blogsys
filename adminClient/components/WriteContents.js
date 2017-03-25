import React from 'react';
import { connect } from 'react-redux';
import {} from 'react-router-redux';
import { Field, reduxForm } from 'redux-form';
import ReactMarkdown from 'react-markdown';
import {} from '../actions';

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
  const Container = ({formVal}) => {
    if (formVal.write) {
      if (formVal.write.values && formVal.write.values.inBody) {
        input = formVal.write.values.inBody;
      }
      if (input && (!formVal.write.values || !formVal.write.values.inBody)) {
        input = '';
      }
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
        <button>submit</button>
      </div>
    );
  };
  return connect((state, props) => {
    return {
      formVal: state.form
    };
  }, (dispatch) => {
    return {};
  })(Container);
})();

export default WriteContents;