import last from 'lodash/array/last';
import { CLICK_THREAD, RECEIVE_RAW_MESSAGES } from '../constants/ChatConstants';

export default function currentThreadID(state = null, action) {
  switch (action.type) {
    case CLICK_THREAD:
      return action.threadID;
    case RECEIVE_RAW_MESSAGES:
      return last(action.rawMessages).threadID;
    default:
      return state;
  }
}
