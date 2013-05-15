
var url = require("url");
/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */

// var pathnameRouter = function(parseUrl){
//   switch(parseUrl.pathname) {
//     case '/':
//       message = 'root';
//       break;
//     case '/favicon.ico':
//       message = 'favicon';
//       break;
//     case '/1/classes/messages':
//       (function(query){
//         //do something with query
//         //return sorted messages by time "-created at"
//       }(parseUrl.query));
//       break;
//     default:
//       console.log(parseUrl.pathname);
//       // console.log(parseUrl.query);
//       break;
//   }
// };

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GETS, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 //seconds
};

var message = JSON.stringify({results:[{
      'username': 'shawndrost',
      'text': 'trololo',
      'roomname': '4chan',
      'hax': 'alert("hi")',
      'createdAt': new Date()
    }]});

var httpMethodRouter = function(request, response){
  if(request.method === 'GET'){
    response.writeHead(200, defaultCorsHeaders);
    response.end(message);
    //deal with GET
  } else if(request.method === 'POST'){
    //deal with POST
    response.writeHead(200, defaultCorsHeaders);
    response.end('POST!');
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