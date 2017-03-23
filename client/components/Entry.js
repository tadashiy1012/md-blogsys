import React from 'react';
import { connect } from 'react-redux';
import { fetchEntry } from '../actions';

const Entry = (() => {
  const DateItem = ({dt}) => {
    const date = new Date(dt);
    return (
      <span style={{'fontSize': 12}}>
        {date.getFullYear()}
        <span>-</span>
        {date.getMonth() + 1}
        <span>-</span>
        {date.getDate()}
        <span> </span>
        {date.getHours()}
        <span>:</span>
        {date.getMinutes()}
      </span>
    );
  };
  const Container = ({entry}) => {
    return (
      <div>
        <div><h3>{entry.title}</h3></div>
        <div><p>{entry.body}</p></div>
        <div><DateItem dt={entry.date} /></div>
      </div>
    );
  };
  return connect((state, props) => {
    return {
      entry: props.entry
    };
  }, (dispatch) => {
    return {};
  })(Container);
})();

export default Entry;