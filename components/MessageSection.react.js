import React, { Component} from 'react';
import MessageComposer from './MessageComposer.react';
import MessageListItem from './MessageListItem.react';

export default class MessageSection extends Component {

  componentDidMount() {
    this._scrollToBottom();
  }

  render() {
    const { threads, messages, currentThreadID } = this.props;
    const currentThread = threads[currentThreadID]
    if (currentThread) {
      let messageListItems = currentThread.messages.map((messageID) => {
        let message = messages[messageID];
        return (
          <MessageListItem
            key={messageID}
            message={message}
          />
        );
      });

      return (
        <div className="message-section">
          <h3 className="message-thread-heading">{currentThread.threadName}</h3>
          <ul className="message-list" ref="messageList">
            {messageListItems}
          </ul>
          <MessageComposer
            {...this.props}
          />
        </div>
      );
    } else {
      return <div className="message-section"></div>;
    }
  }

  componentDidUpdate() {
    this._scrollToBottom();
  }

  _scrollToBottom() {
    let ul = this.refs.messageList;
    if (ul) {
      ul.scrollTop = ul.scrollHeight;
    }
  }

};
