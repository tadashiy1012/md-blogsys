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
  const Item = ({item}) => {
    return (
      <div>
        <div><h3>{item.title}</h3></div>
        <div><p>{item.body}</p></div>
        <div><DateItem dt={item.date} /></div>
      </div>
    );
  };
  let init = false;
  let currentId = null;
  const Container = ({id, entry, onRead}) => {
    if (currentId !== id) {
      currentId = id;
      if (currentId) {
        init = false;
      }
    }
    if (!init) {
      onRead(currentId);
      init = true;
    }
    if (entry === null || entry === undefined) {
      return (<div>not found</div>)
    } else {
      return (<Item item={entry[0]} />);
    }
  };
  return connect((state, props) => {
    return { 
      id: state.router.location.search.split('=')[1],
      entry: state.reducer.entry
    };
  }, (dispatch) => {
    return {
      onRead: (tgtId) => {
        dispatch(fetchEntry(tgtId));
      }
    };
  })(Container);
})();

export default Entry;