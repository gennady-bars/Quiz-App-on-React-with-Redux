import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import {createStore, compose, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from './store/reducers/rootReducer';
import thunk from 'redux-thunk';
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;
    var firebaseConfig = {
      apiKey: "AIzaSyAGcKWLirFintSSKEzMpxqdJWWW0rAj2Og",
      authDomain: "react-quiz-59330.firebaseapp.com",
      databaseURL: "https://react-quiz-59330.firebaseio.com",
      projectId: "react-quiz-59330",
      storageBucket: "react-quiz-59330.appspot.com",
      messagingSenderId: "85136464805",
      appId: "1:85136464805:web:8e60241699fe165c7ea64c",
      measurementId: "G-8B92D93TWN"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);


const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);


serviceWorker.unregister();
