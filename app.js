var RED = require("node-red");
var express = require("express");
var http = require("http");

var app = express();
var server = http.createServer(app);

var settings = {
    // 1. Move the Admin Editor to /admin to avoid route collisions
    httpAdminRoot: "/admin",
    // 2. Keep your API/Node endpoints at /api
    httpNodeRoot: "/api",
    userDir: "./data",
    functionGlobalContext: {}
};

RED.init(server, settings);

app.use(settings.httpAdminRoot, RED.httpAdmin);
app.use(settings.httpNodeRoot, RED.httpNode);

// 3. Optional: Redirect anyone who visits the bare root link "/" straight to your Dashboard!
app.get('/', function(req, res) {
    res.redirect('/api/ui');
});

// Use Render's dynamic port
server.listen(process.env.PORT || 10000);

RED.start();
