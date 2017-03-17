import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createHashHistory';
import { Route } from 'react-router';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import reducer from './reducers';

const history = createHistory();
const middleware = routerMiddleware(history);

console.log(reducer);

const store = createStore(
  combineReducers({
    reducer,
    router: routerReducer
  }),
  applyMiddleware(middleware)
);

const App1 = ({}) => {
  return (
    <div>
      <h1>app1</h1>
    </div>
  );
};

const App2 = ({}) => {
  return (
    <div>
      <h1>app2</h1>
    </div>
  );
};

window.addEventListener('load', () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Route exact path="/" component={App1} />
          <Route path="/app1" component={App1} />
          <Route path="/app2" component={App2} />
        </div>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  );
  console.log('ready');
});