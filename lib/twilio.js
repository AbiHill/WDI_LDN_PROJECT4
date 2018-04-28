//Automated text messages via twilio - when users join an event

const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

function sendSMS(phone, message) {
  return client.messages.create({
    from: '+441173256871',
    to: phone,
    body: message
  });
}

module.exports = {
  sendSMS
};
