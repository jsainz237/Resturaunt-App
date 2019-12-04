// VENDOR
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';

// APP
import rootReducer from './reducers/reducer'
import AppWrapper from './components/AppWrapper/AppWrapper'

/** create redux store */
const reduxStore = createStore(rootReducer, applyMiddleware(thunk));

/** This is the main component of the App */
export default function App() {
  return (
    <Provider store={reduxStore}>
      <AppWrapper />
    </Provider>
  );
}
