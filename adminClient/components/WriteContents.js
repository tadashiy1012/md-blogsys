import React from 'react';
import { connect } from 'react-redux';
import {} from 'react-router-redux';
import {} from '../actions';

const WriteContents = (() => {
  const Container = () => {
    return (
      <div>write</div>
    );
  };
  return connect((state, props) => {
    return {};
  }, (dispatch) => {
    return {};
  })(Container);
})();

export default WriteContents;