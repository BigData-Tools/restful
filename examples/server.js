/*
 * standalone-server.js: Simple standalone `restful` server.
 *
 * (C) 2012, Nodejitsu Inc.
 *
 */
 
var http        = require('http'),
    helpers     = require('../test/helpers'),
    restful     = require('../lib/restful'),
    resourceful = require('resourceful');

//
// Create a new Director routing map based on defined resources
//
//var router = restful.createRouter([helpers.Creature, helpers.Album]);
var router = restful.createRouter(helpers.Creature);

//
// Setup a very simple HTTP server to serve our routing map!
//
var server = http.createServer(function (req, res) {
  req.chunks = [];
  req.on('data', function (chunk) {
    req.chunks.push(chunk.toString());
  });
  router.dispatch(req, res, function (err) {
    if (err) {
      res.writeHead(404);
      res.end();
    }
    console.log('Served ' + req.url);
  });
});

server.listen(8000);

console.log(' > http server started on port 8000');
console.log('visit: http://localhost:8000/ ');