// This file bootstraps the entire application.
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import ChatApp from './components/ChatApp.react';
import * as Actions from './actions';
import configureStore from './store/configureStore';

const store = configureStore();
window.chatStore = store;
store.dispatch(Actions.getAllMessages());
render(
	  <Provider store={store}>
	    <ChatApp />
	  </Provider>,
	  document.getElementById('react')
)	