/*
    Author: Vagner Santana;
            vagnersantana.com
*/

var io = require('socket.io').listen(8080);

var express = require("express");
var app = express();

app.set('view engine', 'jade');

app.set('view options', {
    layout:false
});

app.get('/mb/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    res.render('mobile.jade', {id:id, title:'Player.IO | Control'});
});

app.get('/player/:id/:action/:val?', function (req, res) {
    var id = req.params.id;
    var action = req.params.action;
    var val = req.params.val;
    sockets[id].emit('play', {action:action, val:val});
    res.send('ok');
});

app.listen(8000);

var sockets = {};
io.sockets.on('connection', function (socket) {
    socket.on('setId', function (id) {
        sockets[id] = socket;
    });
});