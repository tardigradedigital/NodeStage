var http = require('http');
http.createServer(function(req, res) {
    console.log('Request: ' + req.url);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<h3>Tardigrade Node.JS Stage is running</h3>');
}).listen(process.env.PORT);