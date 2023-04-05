import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router} from 'react-router-dom';

import { composeWithDevTools } from 'redux-devtools-extension';
import contactReducer from './redux/reducer/contactReducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// import store from './Store';
const store = createStore(contactReducer,composeWithDevTools())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
    <Router>
    <App />
    </Router>
    </Provider>
  </React.StrictMode>
);

