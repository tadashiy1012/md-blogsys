import { handleAction, handleActions } from 'redux-actions';
import { echo, postEntry, rePostResult,
  fetchAll, fetchOne, select, editForm
} from '../actions';

const reducer = handleActions({
  [echo]: (state, action) => {
    return Object.assign({}, state, {
      echoMsg: action.payload
    });
  },
  [postEntry]: (state, action) => {
    return Object.assign({}, state, {
      postResult: action.payload  
    });
  },
  [rePostResult]: (state, action) => {
    return Object.assign({}, state, {
      postResult: action.payload
    });
  },
  [fetchAll]: (state, action) => {
    return Object.assign({}, state, {
      entries: action.payload
    });
  },
  [fetchOne]: (state, action) => {
    return Object.assign({}, state, {
      entry: action.payload
    });
  },
  [select]: (state, action) => {
    return Object.assign({}, state, {
      selected: action.payload
    });
  },
  [editForm]: (state, action) => {
    return Object.assign({}, state, {
      editForm: action.payload
    });
  }
}, {
  echoMsg: '',
  postResult: null,
  entries: [],
  entry: null,
  selected: null,
  editForm: {title: '', body: ''}
});

export default reducer;