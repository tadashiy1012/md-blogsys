import React from 'react';
import ReactDOM from 'react-dom';

const App = ({}) => {
  return (
    <div>
      <h1>app</h1>
    </div>
  );
}

window.addEventListener('load', () => {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
  console.log('ready');
});