
var url = require("url");
/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */

exports.handleRequest = function(request, response) {
// do stuf to thre request
//call sendResponse with data from handleRequest()
  var statusCode = 200;
  var defaultCorsHeaders = {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GETS, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "content-type, accept",
    "access-control-max-age": 10 //seconds
  };
  var headers = defaultCorsHeaders;
  headers['Content-type'] = 'text/plain';
  var message;
  switch(request.url) {
    case '/':
      message = 'root';
      break;
    case '/favicon.ico':
      message = 'favicon';
      break;
    case '/1/classes/messages':
      message = 'messages';
      break;
    case
      console.log(request.url.query);
      break;
  }
  console.log('Serving awesome requests types '+ request.method + ' for url ' + request.url);

  response.writeHead(statusCode, headers);
  response.end(message);
};