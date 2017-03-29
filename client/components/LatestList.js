import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { fetchTitles } from '../actions';

const LatestList = (() => {
  const Item = ({item, click}) => {
    const url = '/entry/' + item.id;
    return (
      <li>
        <a href='#' onClick={(e) => {
          e.preventDefault();
          click(item.id);
        }}>{item.title}</a>
      </li>
    );
  };
  class Items extends React.Component {
    constructor(props) {
      super(props);
    }
    componentWillMount() {
      this.props.handleRead();
    }
    render() {
      const node = this.props.ls.map((item, idx) => {
        return (<Item key={idx} item={item} click={this.props.handleClick} />);
      });
      return (
        <ul>{node}</ul>
      );
    }
  }
  const Container = ({ls, onRead, onLinkClick}) => {
    return (
      <div>
        <h4>latest entries</h4>
        <Items ls={ls} handleRead={onRead} handleClick={onLinkClick} />
      </div>
    );
  };
  return connect((state, props) => {
    return { ls: state.reducer.titles };
  }, (dispatch) => {
    return {
      onRead: () => { dispatch(fetchTitles()); },
      onLinkClick: (tgtId) => { 
        dispatch(push('/entry?id=' + tgtId));
      }
    };
  })(Container);
})();

export default LatestList;