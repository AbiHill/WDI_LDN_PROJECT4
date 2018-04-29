const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const Event = require('../models/event');
const User = require('../models/user');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();

  // Seeding a user to attached the initial events in the database
  User.create({
    username: 'abihill',
    firstName: 'abi',
    email: 'abi@abi.com',
    tel: '00000000000',
    address: '00 Address Close, London, E15 4RR',
    password: 'password',
    passwordConfirmation: 'password',
    image: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-1/p160x160/21557860_979890177921_6745485056896021315_n.jpg?_nc_cat=0&oh=5d12a2e800376f80db13d6e97958ebbd&oe=5B7478BA',
    events: []
  })
    .then(user => {
      return Event.create([{
        name: 'Basketball Scrimmage',
        sport: 'Basketball',
        address: '22 Grove Road, Hitchin, Herts SG4 0AF',
        location: {
          lat: 51.957608,
          lng: -0.269226
        },
        image: 'https://cbsdetroit.files.wordpress.com/2014/08/83830190.jpg?w=420',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.',
        teamSize: 10,
        dateTime: 2018-4-13,
        time: 13.00,
        joinedUsers: [],
        createdBy: user
      },
      {
        name: 'Football Match',
        sport: 'Football',
        address: '33 Leman St, Whitechapel, London E1 8PT',
        location: {
          lat: 51.5137489,
          lng: -0.0703102
        },
        image: 'https://res.cloudinary.com/jerrick/image/upload/c_fit,f_auto,fl_progressive,q_auto,w_1100/chkcwgslbexsxikjgcqs',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.',
        teamSize: 11,
        dateTime: 2018-5-10,
        time: 10.00,
        joinedUsers: [],
        createdBy: user
      },
      {
        name: 'Tennis Doubles',
        sport: 'Tennis',
        address: '20 Leman St, Whitechapel, London E1 8PT',
        location: {
          lat: 51.5137485,
          lng: -0.0703100
        },
        image: 'https://www.cssc.co.uk/CSSC/cache/file/E0A0D90E-D219-DB92-59BA24F8F9BFCFFA.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.',
        teamSize: 2,
        dateTime: 2018-7-13,
        time: 14.00,
        joinedUsers: [],
        createdBy: user
      },
      {
        name: 'VolleyBall-A-Thon',
        sport: 'VolleyBall',
        address: 'Rex House 4-12, Regent Street, Piccadilly, London, Central London, SW1Y 4PE',
        location: {
          lat: 51.5137420,
          lng: -0.0703102
        },
        image: 'https://www.openplay.co.uk/uploads/tLEVLonPC6CmDPml-600x_.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.',
        teamSize: 2,
        dateTime: 2018-7-13,
        time: 14.00,
        joinedUsers: [],
        createdBy: user
      },
      {
        name: 'Frisbeeeeeee',
        sport: 'Frisbee',
        address: 'Rex House 4-12, Regent Street, Piccadilly, London, Central London, SW1Y 4PE',
        location: {
          lat: 51.5133420,
          lng: -0.0704102
        },
        image: 'https://www.ci.sherman.tx.us/ImageRepository/Document?documentID=8098',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.',
        teamSize: 2,
        dateTime: 2018-7-13,
        time: 14.00,
        joinedUsers: [],
        createdBy: user
      }]);
    })
    .then(events => console.log(`${events.length} events created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
