const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const Event = require('../models/event');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();

  Event.create([{
    name: 'Basketball Scrimmage',
    sport: 'Basketball',
    address: '31 Leman St, Whitechapel, London E1 8PT',
    location: {
      lat: 51.5137488,
      lng: -0.0703101
    },
    image: 'https://londonolios.files.wordpress.com/2016/03/0016.jpg',
    desciption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.',
    teamSize: 5

  },
  {
    name: 'Football Match',
    sport: 'Football',
    address: '33 Leman St, Whitechapel, London E1 8PT',
    location: {
      lat: 51.5137489,
      lng: -0.0703102
    },
    image: 'https://londonolios.files.wordpress.com/2016/03/0016.jpg',
    desciption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.',
    teamSize: 11

  },
  {
    name: 'Tennis Doubles',
    sport: 'Tennis',
    address: '20 Leman St, Whitechapel, London E1 8PT',
    location: {
      lat: 51.5137485,
      lng: -0.0703100
    },
    image: 'https://londonolios.files.wordpress.com/2016/03/0016.jpg',
    desciption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.',
    teamSize: 2
  }
  ])
    .then(events => console.log(`${events.length} events created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
