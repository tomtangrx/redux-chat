import { createStore, applyMiddleware } from 'redux';
//import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import saga from 'redux-saga';
import rootSaga from '../sagas';
//import sagaMonitor from '../../../sagaMonitor'

const finalCreateStore = applyMiddleware(
	saga(rootSaga))(createStore);
	
export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
}
