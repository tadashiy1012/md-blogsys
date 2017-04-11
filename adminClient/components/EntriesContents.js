import React from 'react';
import { connect } from 'react-redux';
import {} from 'react-router-redux';
import { fetchAll, select, editForm, 
  updateEntry, delEntry, reUpdateResult
} from '../actions';

const EntriesContents = (() => {
  class ResultMessage extends React.Component {
    constructor(props) {
      super(props);
      this.successMessage = 'post success!';
      this.failMessage = 'post failed!';
      this.baseStyle = {
        display: 'block', textAlign: 'center', width: '100%', padding: '8px 0px'
      };
      this.successStyle = {
        border: 'solid 2px green'
      };
      this.failStyle = {
        border: 'solid 2px red'
      };
      this.hideStyle = {
        display: 'none'
      };
      this.state = {
        show: false,
        status: false
      };
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.postResult && nextProps.postResult.status === 200) {
        this.setState({show: true, status: true});
      } else if (nextProps.postResult && nextProps.postResult.status !== 200) {
        this.setState({show: true, status: false});
      } else {
        this.setState({show: false, status: false});
      }
    }
    render() {
      const message = this.state.status ? this.successMessage : this.failMessage;
      const style = Object.assign({}, this.baseStyle,
        this.state.status ? this.successStyle : this.failStyle);
      return (
        <div style={this.state.show ? style : this.hideStyle}>
          {message}
        </div>
      );
    }
  }
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
          <button onClick={() => {
            const id = this.props.tgtItem.id;
            const title = this.props.editValues.title;
            const body = this.props.editValues.body;
            this.props.handleUpdate(id, title, body);  
          }}>update entry</button>
          <br />
          <button onClick={() => {
            const id = this.props.tgtItem.id;
            this.props.handleDel(id);
          }}>delete entry</button>
        </div>
      );
    }
  }
  const Container = ({
      entries, selected, editValues, updateResult, delResult,
      handleFetch, handleSelect, handleEdit, handleUpdate, handleDel}) => {
    return (
      <div style={{display:'flex'}}>
        <div style={{width:'360px'}}>
          <h3>entries</h3>
          <Entries entries={entries} handleFetch={handleFetch} handleSelect={handleSelect} />
        </div>
        <div style={{width:'100%'}}>
          <h3>edit</h3>
          <ResultMessage postResult={updateResult} />
          <Edit tgtItem={selected} 
            editValues={editValues}
            handleEdit={handleEdit}
            handleUpdate={handleUpdate}
            handleDel={handleDel} />
        </div>
      </div>
    );
  };
  return connect((state, props) => {
    console.log(state);
    return {
      entries: state.reducer.entries,
      selected: state.reducer.selected,
      editValues: state.reducer.editForm,
      updateResult: state.reducer.updateResult,
      delResult: state.reducer.delResult
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
      },
      handleUpdate: (id, title, body) => {
        dispatch(updateEntry(id, title, body));
        dispatch(reUpdateResult());
      },
      handleDel: (id) => {
        dispatch(delEntry(id));
      }
    };
  })(Container);
})();

export default EntriesContents;