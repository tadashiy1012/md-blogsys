import { handleAction, handleActions } from 'redux-actions';
import { fetchEntries, fetchEntry, fetchTitles } from '../actions';

const reducer = handleActions({
  [fetchEntries]: (state, action) => {
    return Object.assign({}, state, {
      entries: action.payload
    });
  },
  [fetchEntry]: (state, action) => {
    return Object.assign({}, state, {
      entries: action.payload
    });
  },
  [fetchTitles]: (state, action) => {
    return Object.assign({}, state, {
      titles: action.payload
    });
  }
}, {
  entries: [],
  titles: []
});

export default reducer;