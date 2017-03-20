import React from 'react';
import { connect } from 'react-redux';
import { fetchEntries } from '../actions';

const Entries = (() => {
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
      <li style={{'listStyleType': 'none', 'marginBottom': 20}}>
        <div><h3>{item.title}</h3></div>
        <div><p>{item.body}</p></div>
        <div><DateItem dt={item.date} /></div>
      </li>
    );
  };
  let init = false;
  const EntriesContainer = ({onRead, ls}) => {
    if (!init) {
      init = true;
      onRead();
    }
    let node = ls.map((item, idx) => {
      return (<Item key={idx} item={item} />);
    });
    return (
      <ul style={{'paddingLeft': 0}}>
        {node}
      </ul>
    );
  };
  return connect((state) => {
    return { ls: state.reducer.entries };
  }, (dispatch) => {
    return {
      onRead: () => {
        dispatch(fetchEntries());
      }
    };
  })(EntriesContainer);
})();

export default Entries;