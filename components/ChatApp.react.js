import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import MessageSection from './MessageSection.react';
import ThreadSection from './ThreadSection.react';

class ChatApp extends Component {

  render() {
    return (
      <div className="chatapp">
        <ThreadSection
         {... this.props}
        />
        <MessageSection
          {... this.props}
        />
      </div>
    );
  }

};

ChatApp.propTypes = {
  threads: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
  currentThreadID: PropTypes.string
};

function mapStateToProps(state) {
  return {
    threads: state.threads,
    messages: state.messages,
    currentThreadID: state.currentThreadID
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatApp);
