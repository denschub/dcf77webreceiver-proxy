"use strict";

var net = require("net"),
  settings = require("./config");

var socketio = require("socket.io").listen(settings.output.port);

net.createServer(function(sock) {
  sock.on("data", function(data) {
    socketio.emit("dcf77signal", data.toString());
  });
}).listen(settings.input.port, settings.input.host);

console.log(`${settings.input.host}:${settings.input.port} => 0.0.0.0:${settings.output.port}`);
