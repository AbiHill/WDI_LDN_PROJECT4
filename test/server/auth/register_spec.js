/* global api, describe, it, expect, beforeEach */

const User = require('../../../models/user');
const userData = {
  email: 'test2@test.com',
  address: {
    location: 123,
    address: 123
  },
  password: 'test2',
  passwordConfirmation: 'test2'
};

describe('POST /register', () => {
  beforeEach(done => {
    User.remove({})
      .then(() => done());
  });

  it('should return a token', done => {
    api
      .post('/api/register')
      .send(userData)
      .end((err, res) => {
        expect(res.body.token.split('.').length).to.eq(3);
        done();
      });
  });

  it('should return a message', done => {
    api
      .post('/api/register')
      .send(userData)
      .end((err, res) => {
        expect(res.body.message).to.eq('Thank you for registering');
        done();
      });
  });

  it('should return a 422 response if the passwords don\'t match', done => {
    const badData = Object.assign({}, userData, { password: 'bad' });
    api
      .post('/api/register')
      .send(badData)
      .end((err, res) => {
        console.log('RES', res);
        expect(res.status).to.eq(422);
        done();
      });
  });
});
