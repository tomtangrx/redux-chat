import { take, put, call, fork, race } from 'redux-saga'

import * as ActionTypes from '../constants/ChatConstants'

import { requestRawMessages, showCongratulation,receiveAll,createMessage,receiveCreatedMessage } from '../actions/index';
 
import {io} from '../service/io'

function convertRawMessage(rawMessage, currentThreadID) {
  return {
    ...rawMessage,
    date: new Date(rawMessage.timestamp),
    isRead: rawMessage.threadID === currentThreadID
  };
};

function getCreatedMessageData(text, currentThreadID) {
  var timestamp = Date.now();
  return {
    id: 'm_' + timestamp,
    threadID: currentThreadID,
    authorName: 'Bill', // hard coded for the example
    date: new Date(timestamp),
    text: text,
    isRead: true
  };
};

/*
function delay(d){
  return new Promise(resolve =>
      setTimeout( () => resolve(true), d )
    )
}
*/
export function* getAllMessages() {

  // wait for each GET_ALL_MESSAGES action
  while(yield take(ActionTypes.GET_ALL_MESSAGES)) {
    // dispatch RAW_MESSAGES_REQUEST
    //yield put(requestRawMessages());
    //const messages = yield call(getMessages);
    //console.log(messages);
    io.emit('getAll');
    // yield put(receiveAll(messages));
  }
}

export function* postNewMessage() {
  while(true){
      const {text, currentThreadID} = yield take(ActionTypes.POST_NEW_MESSAGE);
      let message = yield call(getCreatedMessageData, text, currentThreadID );
      // primus.write(message);
      io.emit('sendMsg', message);
      
      //yield put(createMessage(message));
      //const createdMessage = yield call(postMessage, message)
      //yield put(receiveCreatedMessage(createdMessage, message.id));
  }
}

export default function* root() {
  yield fork(getAllMessages);
  yield fork(postNewMessage);
}