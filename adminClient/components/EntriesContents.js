import React from 'react';
import { connect } from 'react-redux';
import {} from 'react-router-redux';
import { fetchAll, select, editForm } from '../actions';

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
  const EditForm = ({title, body, handleEdit}) => {
    let values = {
      title: title,
      body: body
    };
    return (
      <div>
        <label>title</label><br />
        <input type='text' value={title} style={{width: '100%'}} onChange={(e) => {
          values.title = e.target.value;
          handleEdit(values);
        }} />
        <br />
        <label>body</label><br />
        <textarea value={body} style={{width: '100%'}} rows='5' onChange={(e) => {
          values.body = e.target.value;
          handleEdit(values);
        }} ></textarea>
      </div>
    );
  };
  class Edit extends React.Component {
    componentWillReceiveProps(nextProps) {
      if (this.props.tgtItem !== nextProps.tgtItem) {
        this.props.handleEdit({
          title: nextProps.tgtItem.title, 
          body: nextProps.tgtItem.body});
      }
    }
    render() {
      return (
        <div>
          <EditForm
            title={this.props.editValues.title}
            body={this.props.editValues.body}
            handleEdit={this.props.handleEdit}
          />
        </div>
      );
    }
  }
  const Container = ({entries, selected, editValues, handleFetch, handleSelect, handleEdit}) => {
    return (
      <div style={{display:'flex'}}>
        <div style={{width:'360px'}}>
          <h3>entries</h3>
          <Entries entries={entries} handleFetch={handleFetch} handleSelect={handleSelect} />
        </div>
        <div style={{width:'100%'}}>
          <h3>edit</h3>
          <Edit tgtItem={selected} editValues={editValues} handleEdit={handleEdit} />
        </div>
      </div>
    );
  };
  return connect((state, props) => {
    console.log(state);
    return {
      entries: state.reducer.entries,
      selected: state.reducer.selected,
      editValues: state.reducer.editForm
    };
  }, (dispatch) => {
    return {
      handleFetch: () => {
        dispatch(fetchAll());
      },
      handleSelect: (item) => {
        dispatch(select(item));
      },
      handleEdit: (values) => {
        dispatch(editForm(values));
      }
    };
  })(Container);
})();

export default EntriesContents;