import { handleAction, handleActions } from 'redux-actions';
import { echo, postEntry, rePostResult,
  fetchAll, fetchOne
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
  }
}, {
  echoMsg: '',
  postResult: null,
  entries: [],
  entry: null
});

export default reducer;