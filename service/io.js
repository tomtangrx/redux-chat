import socket from "socket.io-client";
import { requestRawMessages, showCongratulation,receiveAll,createMessage,receiveCreatedMessage } from '../actions/index';

var defaultUrl;

try {
  if (location.origin) {
    defaultUrl = location.origin;
  } else {
    defaultUrl = location.protocol +'//'+ location.hostname + (location.port ? ':'+ location.port : '');
  }
} catch (e) {
  defaultUrl = 'http://127.0.0.1';
}
let _store;

export const io = new socket(defaultUrl); 

export function init(store){
  _store = store
};

io.on('data', function received(data) {
  console.log(data);
  
});

io.on('allMsg', function received(data) { 
  receiveAllDataFromServer(data); 
});
export function  receiveAllDataFromServer(messages){
    console.log(' put(receiveAll(messages));');
    //yield* put(receiveAll(messages));
    _store.dispatch(receiveAll(messages));
};