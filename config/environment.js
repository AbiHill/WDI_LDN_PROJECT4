module.exports = {
  port: process.env.PORT || 4000,
  dbURI: process.envMONGODB_URI || 'mongodb://localhost/scrimmage',
  secret: process.env.SECRET || 'shhh'
};
