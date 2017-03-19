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
import { Entries } from './components';

const history = createHistory();
const middlewares = [routerMiddleware(history), promiseMiddleware];

const store = createStore(
  combineReducers({
    reducer,
    router: routerReducer
  }),
  applyMiddleware(...middlewares)
);

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