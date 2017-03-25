import React from 'react';
import { connect } from 'react-redux';
import {} from 'react-router-redux';
import {} from '../actions';

const SettingContents = (() => {
  const Container = () => {
    return (
      <div>setting</div>
    );
  };
  return connect((state, props) => {
    return {};
  }, (dispatch) => {
    return {};
  })(Container);
})();

export default SettingContents;