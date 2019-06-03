import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './redux/index';
import rootSaga from './sagas/index';
import App from './components/App';
//imported fonts also go here Fonts

const sagaMiddleware = createSagaMiddleware();

// this line creates an array of all redux and saga middleware needed
// redux-logger will only be added to the project if in development mode
const middlewareList = process.env.NODE_ENV === 'development' ?
  [sagaMiddleware, logger] :
  [sagaMiddleware];

// connect reducers and any other middleware to the store
const storeInstance = createStore(
  rootReducer,
  applyMiddleware(...middlewareList)
);

// tells the saga middleware to use the rootSaga
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={storeInstance}> <App/> </Provider>, document.getElementById('react-root'),
);