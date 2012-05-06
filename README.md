# restful - Unreleased Experimental v0.0.0

Create [RESTful](http://en.wikipedia.org/wiki/Representational_state_transfer) APIs for [resourceful](http://github.com/flatiron/resourceful) models.

# Installation

     npm install restful

# Usage

``` js
var http        = require('http'),
    restful     = require('../lib/restful'),
    resourceful = require('resourceful');

//
// Create a new Creature resource using the Resourceful library
//
var Creature = resourceful.define('creature', function () {
  //
  // Specify a storage engine
  //
  this.use('memory');
  //
  // Specify some properties with validation
  //
  this.string('type');
  this.string('description');
});

//
// Create a new Director routing map based on "Creature" resource
//
var router = restful.createRouter(Creature);

//
// Setup a very simple HTTP server to serve our routing map!
//
var server = http.createServer(function (req, res) {
  req.chunks = [];
  req.on('data', function (chunk) {
    req.chunks.push(chunk.toString());
  });
  /*

   Router will now dispatch all RESTFul urls for the Creature resource

    POST    /Creature     => Creature.create()
    GET     /Creature     => Creature.all()
    GET     /Creature/1   => Creature.show()
    PUT     /Creature/1   => Creature.update()
    DELETE  /Creature/1   => Creature.destroy()

  */
  router.dispatch(req, res, function (err) {
    if (err) {
      res.writeHead(404);
      res.end();
    }
    console.log('Served ' + req.url);
  });
});

server.listen(8000);
```

# Tests

     npm test

# TODO

 - Integrate as Flatiron plugin via `app.use(flatiron.plugins.http.restful);`
 - Full `revalidator` property type support ( numeric, boolean, array, object )
 - Nested schema properties
 - Implement and document browser support
 - Improve API to be more consistent with Director syntax ( using `new` keyword )
 - Improve Tests
