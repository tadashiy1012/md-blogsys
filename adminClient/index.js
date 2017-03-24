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
import {} from './components';

const history = createHistory();
const middlewares = [routerMiddleware(history), promiseMiddleware];

const store = createStore(
  combineReducers({
    reducer,
    router: routerReducer
  }),
  applyMiddleware(...middlewares)
);

const App = () => {
  return (
    <div>
      <h1>admin</h1>
    </div>
  );
};

window.addEventListener('load', () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Route exact path="/" component={App} />
        </div>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  );
  console.log('ready');
});