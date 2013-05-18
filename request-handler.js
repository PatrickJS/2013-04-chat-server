var stream = require('stream');
var url = require("url");
var fs = require('fs');
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
  console.log(request.url);
  if (request.url === '/index.html' || request.url === '/') {
    fs.readFile('./app/index.html','utf8',function (err, data) {
      // if (err) throw err;
      returnCode = 200;
      defaultCorsHeaders["Content-Type"] = "text/html";
      response.writeHead(returnCode, defaultCorsHeaders);
      // response.write(data);
      response.end(data);
      return;
    });
    return;
  }
  else if (request.url === '/assets/img/binding_dark.png') {
    returnCode = 404;
    response.writeHead(returnCode, { "Content-Type" : "image/png" });
    response.end();
    // fs.createReadStream('./app/' + request.url).pipe(response);
    return;
  }
  else if (request.url === '/assets/css/styles.css') {
    fs.readFile('./app/' + request.url,'utf8',function (err, data) {
      returnCode = 200;
      defaultCorsHeaders["Content-Type"] = "text/css";
      response.writeHead(returnCode, defaultCorsHeaders);
      response.end(data);
      return;
    });
    return;
  }
  else if (request.url === '/assets/js/setup.js') {
    fs.readFile('./app/' + request.url,'utf8',function (err, data) {
      returnCode = 200;
      defaultCorsHeaders["Content-Type"] = "text/javascript";
      response.writeHead(returnCode, defaultCorsHeaders);
      response.end(data);
      return;
    });
    return;
  }
  else if (request.url === '/assets/lib/jquery.js') {
    fs.readFile('./app/' + request.url,'utf8',function (err, data) {
      returnCode = 200;
      defaultCorsHeaders["Content-Type"] = "text/javascript";
      response.writeHead(returnCode, defaultCorsHeaders);
      response.end(data);
      return;
    });
    return;
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
      console.log('AAAHHHH REAL OPTIONS');
    } else {
      console.log('ERRRRORRRR i saw: ', request.method);
    }
    response.writeHead(returnCode, defaultCorsHeaders);
    response.end(body);
    return;
  }
  console.log('should never get here');
  response.end();
};