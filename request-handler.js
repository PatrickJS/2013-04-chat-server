var stream = require('stream');
var url = require("url");

/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 */

var storage = {
  messages: {
    "results":[]
  }
};
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GETS, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 //seconds
};

exports.handleRequest = function(request, response) {
  console.log('Serving awesome requests types '+ request.method + ' for url ' + request.url);
  var url_parts = url.parse(request.url, true),
      pathNameArray = (url_parts.pathname).split('/'),
      roomName = pathNameArray[pathNameArray.length-1],
      query = url_parts.query,
      returnCode = 404,
      body = 'hello worlds';
  //check if room exists
  if (request.url === '/index.html' || request.url === '/') {
    returnCode = 200;
  }

  if (pathNameArray[1] === 'classes') {
    if(!storage[roomName]) {storage[roomName] = {results: []};}
    if(request.method === 'GET'){
      returnCode = 200;
      body = JSON.stringify(storage[roomName]);
    } else if(request.method === 'POST'){
      returnCode = 201;
      var fullBody = '';
      request.on('data', function(chunk) {
        fullBody += chunk;
      });
      request.on('end', function() {
        var data = JSON.parse(fullBody);  
        storage[roomName].results.unshift(data);
      });
    } else if(request.method === 'OPTIONS'){
      returnCode = 200;
    } else {
      console.log('ERRRRORRRR i saw: ', request.method);
    }
  }

  response.writeHead(returnCode, defaultCorsHeaders);
  response.end(body);

};