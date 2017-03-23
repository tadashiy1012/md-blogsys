import React from 'react';
import { connect } from 'react-redux';
import { fetchEntries, fetchEntry } from '../actions';
import { Entry } from './';

const Entries = (() => {
  let init = false;
  let tempId = null;
  const EntriesContainer = ({onRead, onReadOne, id, ls}) => {
    if (id) {
      if (tempId !== id) {
        onReadOne(id);
      }
      init = false;
    } else {
      if (!init) {
        onRead();
        init = true;
      }
    }
    tempId = id;
    let node = ls.map((item, idx) => {
      return (<Entry key={idx} entry={item} />);
    });
    return (
      <ul style={{'paddingLeft': 0}}>
        {node}
      </ul>
    );
  };
  return connect((state, props) => {
    const id = state.router.location.search.split('=')[1] || null;
    return {
      id,
      ls: state.reducer.entries
    };
  }, (dispatch) => {
    return {
      onRead: () => {
        dispatch(fetchEntries());
      },
      onReadOne: (tgtId) => {
        dispatch(fetchEntry(tgtId));
      } 
    };
  })(EntriesContainer);
})();

export default Entries;