import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import atomicData from './atomic.json';

import reducer, {
  initializeApp
} from './reducer';

const store = createStore(reducer);

const render = () => {
  ReactDOM.render(
    <App state={store.getState()} dispatch={store.dispatch} />,
    document.getElementById('root')
  );
}

render();
store.subscribe(render);
store.dispatch(initializeApp(atomicData));

registerServiceWorker();
