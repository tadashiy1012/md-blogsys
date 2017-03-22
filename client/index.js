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
import { Entries, Entry, LatestList, BackToHome } from './components';

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
    <div className='contents'>
      <section className='left'>
        <h2>nav</h2>
        <BackToHome />
        <LatestList />
      </section>
      <section className='right'>
        <h2>contents</h2>
        <Entries />
        <BackToHome />
      </section>
    </div>
  );
};

const App2 = ({}) => {
  return (
    <div className='contents'>
      <section className='left'>
        <h2>nav</h2>
        <BackToHome />
        <LatestList />
      </section>
      <section className='right'>
        <h2>contents</h2>
        <Entry />
        <BackToHome />
      </section>
    </div>
  );
};

window.addEventListener('load', () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Route exact path="/" component={App1} />
          <Route path="/entry" component={App2} />
        </div>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  );
  console.log('ready');
});