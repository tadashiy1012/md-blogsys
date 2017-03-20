import React from 'react';
import { connect } from 'react-redux';
import { fetchEntries } from '../actions';

const LatestList = (() => {
  const Item = ({item}) => {
    return (
      <li><a>
        <span>{item.title}</span>
      </a></li>
    );
  };
  let init = false;
  const Container = ({ls, onRead}) => {
    if (!init) {
      onRead();
      init = true;
    }
    let node = ls.map((item, idx) => {
      return (<Item key={idx} item={item} />);
    });
    return (
      <ul>{node}</ul>
    );
  };
  return connect((state) => {
    return { ls: state.reducer.entries };
  }, (dispatch) => {
    return {
      onRead: () => { dispatch(fetchEntries()); }
    };
  })(Container);
})();

export default LatestList;