import React from 'react';
import { connect } from 'react-redux';
import { fetchEntry } from '../actions';

const Entry = (() => {
  const Container = ({}) => {
    return (<div>hoge</div>);
  };
  return connect((state, props) => {
    return { entry: state.reducer.entry };
  }, (dispatch) => {
    return {
      onRead: (tgtId) => {
        dispatch(fetchEntry(tgtId));
      }
    };
  })(Container);
})();

export default Entry;