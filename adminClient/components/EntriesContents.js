import React from 'react';
import { connect } from 'react-redux';
import {} from 'react-router-redux';
import { fetchAll, select } from '../actions';

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
        return (<li key={idx}><a href='#' onClick={(e) => {
          e.preventDefault();
          this.props.handleSelect(item);
        }}>{item.title}</a></li>)
      });
      return (
        <ul>{node}</ul>
      );
    }
  }
  const EditForm = ({title, body}) => {
    return (
      <div>
        <label>title</label><br />
        <input type='text' value={title} style={{width: '100%'}} />
        <br />
        <label>body</label><br />
        <textarea value={body} style={{width: '100%'}} rows='5'></textarea>
      </div>
    );
  };
  class Edit extends React.Component {
    render() {
      let node = null;
      if (this.props.tgtItem) {
        node = (<EditForm
          title={this.props.tgtItem.title}
          body={this.props.tgtItem.body}
        />);
      }
      return (
        <div>
          {node}
        </div>
      );
    }
  }
  const Container = ({entries, selected, handleFetch, handleSelect}) => {
    return (
      <div style={{display:'flex'}}>
        <div style={{width:'360px'}}>
          <h3>entries</h3>
          <Entries entries={entries} handleFetch={handleFetch} handleSelect={handleSelect} />
        </div>
        <div style={{width:'100%'}}>
          <h3>edit</h3>
          <Edit tgtItem={selected} />
        </div>
      </div>
    );
  };
  return connect((state, props) => {
    console.log(state);
    return {
      entries: state.reducer.entries,
      selected: state.reducer.selected
    };
  }, (dispatch) => {
    return {
      handleFetch: () => {
        dispatch(fetchAll());
      },
      handleSelect: (item) => {
        dispatch(select(item));
      }
    };
  })(Container);
})();

export default EntriesContents;