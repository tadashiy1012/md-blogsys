import React from 'react';
import { connect } from 'react-redux';
import {} from 'react-router-redux';
import {} from '../actions';

const EntriesContents = (() => {
  const Container = () => {
    return (
      <div>entries</div>
    );
  };
  return connect((state, props) => {
    return {};
  }, (dispatch) => {
    return {};
  })(Container);
})();

export default EntriesContents;