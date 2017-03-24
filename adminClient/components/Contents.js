import React from 'react';
import { connect } from 'react-redux';
import {} from 'react-router-redux';
import {} from '../actions';

const Contents = (() => {
  const Container = ({mode}) => {
    return (
      <div>
        <h2>contents</h2>
        <h3>{mode}</h3>
      </div>
    );
  };
  return connect((state, props) => {
    console.log(state);
    return {
      mode: state.router.location.pathname
    };
  }, (dispatch) => {
    return {};
  })(Container);
})(); 

export default Contents;