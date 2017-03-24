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
import { Link, Contents } from './components';

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
      <div className='header'>
        <h1>admin</h1>
      </div>
      <div className='contents'>
        <section className='left'>
          <h2>nav</h2>
          <ul>
            <li><Link to='write'>write entry</Link></li>
            <li><Link to='entries'>manage to entries</Link></li>
            <li><Link to='setting'>blog settings</Link></li>
          </ul>
          <Link to='/'>Back to Admin Home</Link>
          <br />
          <Link to='/'>Logout</Link>
        </section>
        <section className='right'>
          <Contents />
        </section>
      </div>
    </div>
  );
};

window.addEventListener('load', () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Route exact path="/" component={App} />
          <Route path="/write" component={App} />
          <Route path="/entries" component={App} />
          <Route path="/setting" component={App} />
        </div>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  );
  console.log('ready');
});