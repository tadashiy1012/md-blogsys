import React from 'react';
import { connect } from 'react-redux';
import {} from 'react-router-redux';
import { fetchAll } from '../actions';

const EntriesContents = (() => {
  class Entries extends React.Component {
    constructor(props) {
      super(props);
    }
    componentWillMount() {
      this.props.handleFetch();
    }
    render() {
      const node = this.props.entries.map((item, idx) => {
        return (<li key={idx}>{item.title}</li>)
      });
      return (
        <ul>{node}</ul>
      );
    }
  }
  const Container = ({entries, handleFetch}) => {
    return (
      <div>
        <h3>entries</h3>
        <Entries entries={entries} handleFetch={handleFetch} />
      </div>
    );
  };
  return connect((state, props) => {
    console.log(state);
    return {
      entries: state.reducer.entries
    };
  }, (dispatch) => {
    return {
      handleFetch: () => {
        dispatch(fetchAll());
      }
    };
  })(Container);
})();

export default EntriesContents;