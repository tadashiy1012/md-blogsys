import { handleAction, handleActions } from 'redux-actions';
import { echo, postEntry, rePostResult } from '../actions';

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
  }
}, {
  echoMsg: '',
  postResult: null
});

export default reducer;