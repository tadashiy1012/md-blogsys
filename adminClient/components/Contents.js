import React from 'react';
import { connect } from 'react-redux';
import {} from 'react-router-redux';
import {} from '../actions';
import { HomeContents, WriteContents, EntriesContents, SettingContents} from './';

const ContentsSplitter = (() => {
  const Container = ({mode}) => {
    let contents = <HomeContents />;
    switch (mode) {
      case '/write':
        contents = <WriteContents />;
        break;
      case '/entries':
        contents = <EntriesContents />;
        break;
      case '/setting':
        contents = <SettingContents />;
        break;
    }
    return (
      <div>
        <h2>contents {mode}</h2>
        <div>{contents}</div>
      </div>
    );
  };
  return connect((state, props) => {
    return {
      mode: state.router.location.pathname
    };
  }, (dispatch) => {
    return {};
  })(Container);
})(); 

export default ContentsSplitter;