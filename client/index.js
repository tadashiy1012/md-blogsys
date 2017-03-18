import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import createHistory from 'history/createHashHistory';
import { Route } from 'react-router';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import promiseMiddleware from 'redux-promise';
import reducer from './reducers';
import { fetchEntries } from './actions';

const history = createHistory();
const middleware = routerMiddleware(history);
const middlewares = [middleware, promiseMiddleware];

const store = createStore(
  combineReducers({
    reducer,
    router: routerReducer
  }),
  applyMiddleware(...middlewares)
);

const EntriesContainer = ({onRead, ls}) => {
  onRead();
  return (
    <ul>
      {ls}
    </ul>
  );
};

const Entries = connect((state) => {
  console.log(state);
  return { ls: state.entries };
}, (dispatch) => {
  return {
    onRead: () => {
      dispatch(fetchEntries());
    }
  };
})(EntriesContainer);

const App1 = ({}) => {
  return (
    <div>
      <h1>app1</h1>
      <Entries />
    </div>
  );
};

window.addEventListener('load', () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Route exact path="/" component={App1} />
        </div>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  );
  console.log('ready');
});