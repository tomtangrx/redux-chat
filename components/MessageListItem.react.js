import React, { PropTypes, Component } from 'react';

class MessageListItem extends Component {

  render() {
    let {message} = this.props;
    return (
      <li className="message-list-item">
        <h5 className="message-author-name">{message.authorName}</h5>
        <div className="message-time">
          {message.date.toLocaleTimeString()}
        </div>
        <div className="message-text">{message.text}</div>
      </li>
    );
  }
};

MessageListItem.propTypes = {
  message: PropTypes.object
};

export default MessageListItem;
