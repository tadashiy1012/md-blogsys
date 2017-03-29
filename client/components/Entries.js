import React from 'react';
import { connect } from 'react-redux';
import { fetchEntries, fetchEntry } from '../actions';
import { Entry } from './';

const Entries = (() => {
  class Entries extends React.Component {
    constructor(props) {
      super(props);
    }
    componentWillMount() {
      if (this.props.tgtId) {
        this.props.handleReadOne(this.props.tgtId);
      } else {
        this.props.handleRead();
      }
    }
    render() {
      const node = this.props.ls.map((item, idx) => {
        return (<Entry key={idx} entry={item} />);
      });
      return (
        <ul style={{'paddingLeft': 0}}>
          {node}
        </ul>
      );
    }
  }
  const EntriesContainer = ({onRead, onReadOne, id, ls}) => {
    return (
      <div>
        <Entries tgtId={id} ls={ls} 
          handleRead={onRead} handleReadOne={onReadOne} />
      </div>
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