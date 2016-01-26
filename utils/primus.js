import { requestRawMessages, showCongratulation,receiveAll,createMessage,receiveCreatedMessage } from '../actions/index';

export const primus = new Primus(undefined,
      { 
        reconnect: {
          max: Infinity // Number: The max delay before we try to reconnect.    
          , min: 500 // Number: The minimum delay before we try reconnect.    
          , retries: 10 // Number: How many times we shoult try to reconnect.  
        }
      }
    );
let _store;
export function init(store){
  _store = store
};
primus.on('data', function received(data) {
  console.log(data);
  /*
  if(data.type ==="all"){
    receiveAllDataFromServer(data.messages);
  }
  */
});

primus.on('allMsg', function received(data) {
  //console.log(data);
  receiveAllDataFromServer(data); 
});
 

export function  receiveAllDataFromServer(messages){
    console.log(' put(receiveAll(messages));');
    //yield* put(receiveAll(messages));
    _store.dispatch(receiveAll(messages));
};