import React from 'react';
import { connect } from 'react-redux';
import {} from 'react-router-redux';
import {} from '../actions';

const HomeContents = (() => {
  const Container = () => {
    return (
      <div>home</div>
    );
  };
  return connect((state, props) => {
    return {};
  }, (dispatch) => {
    return {};
  })(Container);
})();

export default HomeContents;