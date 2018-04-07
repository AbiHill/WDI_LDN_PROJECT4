
class Flash {

//first set the message as falsey.
  _messages = null;

  static setMessages(type, message){
    // the below will set the this._messages as the message if it isn't null. If it is null it will move over to the OR and set the message as an empty object.
    this._messages = this._messages || {};
    //here we set the message type as the message, if the object that's coming over is danger: 'hi there'
    this._messages[type] = message;
  }

  //the below function retrieves/returns the message
  static getMessages() {
    return this._messages;
  }

  //this sets the message back to null and therefore falsey
  static clearMessages() {
    this._messages = null;
  }

}

export default Flash;
