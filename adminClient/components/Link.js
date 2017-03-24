import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {} from '../actions';

const Link = (() => {
  const Container = ({to, text, onButtonClick}) => {
    return (
      <a href='#' onClick={(e) => {
        e.preventDefault();
        onButtonClick(to);
      }}>{text}</a>
    );
  };
  return connect((state, props) => {
    return {
      to: props.to,
      text: props.children
    };
  }, (dispatch) => {
    return {
      onButtonClick: (tgt) => { 
        dispatch(push(tgt));
      }
    };
  })(Container);
})();

export default Link;