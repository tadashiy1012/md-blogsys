import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {} from '../actions';

const BackToHome = (() => {
  const Container = ({onButtonClick}) => {
    return (
      <a href='#' onClick={(e) => {
        e.preventDefault();
        onButtonClick();
      }}>Back to Home</a>
    );
  };
  return connect((state, props) => {
    return {};
  }, (dispatch) => {
    return {
      onButtonClick: () => { 
        dispatch(push('/'));
      }
    };
  })(Container);
})();

export default BackToHome;