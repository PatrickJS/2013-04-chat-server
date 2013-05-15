var stream = require('stream');
var url = require("url");
/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 */


var storage = {
  results: [{
      'username': 'shawndrost',
      'text': 'trololo',
      'roomname': '4chan',
      'hax': 'alert("hi")',
      'createdAt': new Date()
    },
    {
      'username': 'Simba',
      'text': 'A kumba ya, ...',
      'roomname': 'TheSavana',
      'hax': 'alert("hi")',
      'createdAt': new Date()
    }]
};
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GETS, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 //seconds
};

var httpMethodRouter = function(request, response){
  if(request.method === 'GET'){
    response.writeHead(200, defaultCorsHeaders);
    response.end(JSON.stringify(storage));
    //deal with GET
  } else if(request.method === 'POST'){
    //deal with POST
    var fullBody = '';
    request.on('data', function(chunk) {
      console.log(chunk);
      fullBody += chunk.toString(); //might not need to change toString because it might screw up JSON 
    });
    request.on('end', function() {
      // body...
      var data = fullBody;
      storage.results.push(JSON.parse(data));
      console.log(data);
      response.writeHead(200, defaultCorsHeaders);
      response.end('POST!');
    });
  } else if(request.method === 'OPTIONS'){
    response.writeHead(200, defaultCorsHeaders);
    response.end('OPTIONS!');
  } else {
    console.log('ERRRRORRRR i saw: ', request.method);
  }
};


exports.handleRequest = function(request, response) {
  console.log('Serving awesome requests types '+ request.method + ' for url ' + request.url);

  httpMethodRouter(request, response);
};