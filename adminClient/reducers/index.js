import { handleAction, handleActions } from 'redux-actions';
import { echo } from '../actions';

const reducer = handleActions({
  [echo]: (state, action) => {
    return Object.assign({}, state, {
      echoMsg: action.payload
    });
  }
}, {
  echoMsg: ''
});

export default reducer;