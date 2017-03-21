import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { fetchEntries } from '../actions';

const LatestList = (() => {
  const Item = ({item, click}) => {
    const url = '/entry/' + item.id;
    return (
      <li>
        <a onClick={(e) => {
          e.preventDefault();
          click(item.id);
        }}>{item.title}</a>
      </li>
    );
  };
  let init = false;
  const Container = ({ls, onRead, onLinkClick}) => {
    if (!init) {
      onRead();
      init = true;
    }
    let node = ls.map((item, idx) => {
      return (<Item key={idx} item={item} click={onLinkClick} />);
    });
    return (
      <ul>{node}</ul>
    );
  };
  return connect((state, props) => {
    return { ls: state.reducer.entries };
  }, (dispatch) => {
    return {
      onRead: () => { dispatch(fetchEntries()); },
      onLinkClick: (tgtId) => { 
        dispatch(push('/entry?id=' + tgtId));
      }
    };
  })(Container);
})();

export default LatestList;