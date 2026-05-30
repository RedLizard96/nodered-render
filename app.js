var RED = require("node-red");
var express = require("express");
var http = require("http");

var app = express();
var server = http.createServer(app);

var settings = {
    httpAdminRoot: "/admin",
    httpNodeRoot: "/api",
    userDir: "./data",
    functionGlobalContext: {}
};

RED.init(server, settings);

app.use(settings.httpAdminRoot, RED.httpAdmin);
app.use(settings.httpNodeRoot, RED.httpNode);

app.get('/', function(req, res) {
    res.redirect('/api/ui');
});

server.listen(process.env.PORT || 10000);

RED.start();
