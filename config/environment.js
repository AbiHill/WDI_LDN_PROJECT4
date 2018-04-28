const env = process.env.NODE_ENV || 'dev';
//set up for heroku port or local server 4000
const port = process.env.PORT || 4000;
//set up mongo database for heroku or local server database
const dbURI = process.env.MONGODB_URI || `mongodb://localhost/events-${env}`;
//for authentication 
const secret = process.env.SECRET || 'a^yd%2GH!)zI*_4fsQ';

module.exports = { env, port, dbURI, secret };
