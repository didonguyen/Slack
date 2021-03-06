const Namespace = require('../classes/Namespace.js');
const Room = require('../classes/Room.js');

let namespaces = [];

let Google = new Namespace(0, 'Google', './assets/google_logo.png', '/google');
let Facebook = new Namespace(1, 'Facebook', './assets/facebook_logo.png', '/facebook');

namespaces.push(Google, Facebook);

Google.addRoom(new Room(0, 'Google Drive', 'Google'));
Google.addRoom(new Room(1, 'Google Photo', 'Google', true));

Facebook.addRoom(new Room(0, 'Facebook Messenger', 'Facebook'));

module.exports = namespaces;
