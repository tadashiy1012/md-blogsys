import { handleAction, handleActions } from 'redux-actions';
import { fetchEntries } from '../actions';

const reducer = handleActions({
  [fetchEntries]: (state, action) => {
    console.log(state);
    console.log(action);
    return Object.assign({}, state, {
      entries: action.payload
    });
  }
}, {
  entries: []
});

export default reducer;