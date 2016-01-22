import React, { PropTypes, Component} from 'react';

let ENTER_KEY_CODE = 13;

class MessageComposer extends Component {

  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
      <textarea
        className="message-composer"
        name="message"
        value={this.state.text}
        onChange={this._onChange.bind(this)}
        onKeyDown={this._onKeyDown.bind(this)}
      />
    );
  }

  _onChange(event, value) {
    this.setState({text: event.target.value});
  }

  _onKeyDown(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      event.preventDefault();
      let text = this.state.text.trim();
      if (text) {
        const { threads, messages, currentThreadID } = this.props;
        this.props.postNewMessage(text, this.props.currentThreadID);
      }
      this.setState({text: ''});
    }
  }
};

MessageComposer.propTypes = {
  currentThreadID: PropTypes.string.isRequired
};

export default MessageComposer;