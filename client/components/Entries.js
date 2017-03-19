import React from 'react';
import { connect } from 'react-redux';
import { fetchEntries } from '../actions';

const Entries = (() => {
  const Item = ({item}) => {
    return (
      <li>
        <span>{item.id}</span><span>:</span>
        <span>{item.title}</span><span>:</span>
        <span>{item.body}</span><span>:</span>
        <span>{item.date}</span>
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
      <ul>
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