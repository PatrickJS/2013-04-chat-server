var stream = require('stream');
var url = require("url");
var qs = require('querystring');
/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 */


var storage = {
};
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GETS, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 //seconds
};

exports.handleRequest = function(request, response) {
  console.log('Serving awesome requests types '+ request.method + ' for url ' + request.url);
  var url_parts = url.parse(request.url, true);
  var pathNameArray = (url_parts.pathname).split('/');
  var returnCode = 404;
  var body = '\n';  // explisit nothing
  var roomName = pathNameArray[pathNameArray.length-1];
  var query = url_parts.query;

  if (pathNameArray[1] !== 'classes') {
  } else if(request.method === 'GET'){
    returnCode = 200;
    if(!storage[roomName]) {
      storage[roomName] = [];
    }
    body = JSON.stringify(storage[roomName]);
  } else if(request.method === 'POST'){
    returnCode = 302;
    var fullBody = '';
    request.setEncoding('utf8');
    request.on('data', function(chunk) {
      fullBody += chunk;
    });
    request.on('end', function() {
      var data = fullBody;
      storage[roomName].unshift(qs.parse(data));
    });
  } else if(request.method === 'OPTIONS'){
    returnCode = 200;
  } else {
    console.log('ERRRRORRRR i saw: ', request.method);
  }

  response.writeHead(returnCode, defaultCorsHeaders);
  console.log(response);
  response.end(body);

};