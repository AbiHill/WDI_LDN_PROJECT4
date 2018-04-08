import React from 'react';
import Flash from '../../lib/Flash';

const FlashMessage = () => {
  //get any messages that have been set and store them in a variable
  const messages = Flash.getMessages();
  //clear the messages so that when you navigate away from that page the flash message doesn't reappear
  Flash.clearMessages();
  return (
    <div className="container">
      {/* if messages exists then iterate over the messages objects (by using the keys and then mapping) and show all the messages from that object */}
      {messages && Object.keys(messages).map((type, i) =>
        <div key={i} className={`notification is-${type}`}>{messages[type]}</div>
      )}
    </div>
  );
};

export default FlashMessage;
