import { handleAction, handleActions } from 'redux-actions';
import {hoge} from '../actions';

const reducer = handleActions({
  [hoge]: (state, action) => Object.assign({}, state, {
    hoge: action.payload
  })
}, {
  hoge: 'hoge'
});

export default reducer;