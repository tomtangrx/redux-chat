import React, { PropTypes, Component} from 'react';
import {uploadFile} from '../service/utils';
let ENTER_KEY_CODE = 13;

class MessageComposer extends Component {

  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
      <div>
        <textarea
          className="message-composer"
          name="message"
          value={this.state.text}
          onChange={this._onChange.bind(this)}
          onKeyDown={this._onKeyDown.bind(this)}
        />
        <input type="file" onChange={this._onFileChange.bind(this)}/>
      </div>
    );
  }

  _onChange(event, value) {
    this.setState({text: event.target.value});
  }
  _onFileChange(event, value){
    console.log(event.target.files[0]);
    console.log(event.target.value);
    var upload = uploadFile('/api/photo', event.target.files[0], {});
    /*upload.then(function(r){
      console.log('上传结果：');
      console.log(r);
    });*/
    //console.log(value);
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
