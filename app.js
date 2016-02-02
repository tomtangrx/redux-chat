// This file bootstraps the entire application.
import 'babel-polyfill';
// import  Primus from  "script!./primus.js";
import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import ChatApp from './components/ChatApp.react';
import * as Actions from './actions';
import {init} from './service/io';
import configureStore from './store/configureStore';

const store = configureStore();
init(store);
//window.chatStore = store;
store.subscribe(() =>
	{console.log(store.getState())}
	)
store.dispatch(Actions.getAllMessages());
render(
	  <Provider store={store}>
	    <ChatApp />
	  </Provider>,
	  document.getElementById('react')
)	