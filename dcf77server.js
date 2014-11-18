var net = require("net"),

    // for the dcf77webreceiver-server
    inputSettings = {
      host: "0.0.0.0",
      port: 20042
    },

    // for socket.io
    outputSettings = {
      port: 10042
    };

var socketio = require("socket.io").listen(outputSettings.port);

socketio.configure('production', function(){
  socketio.set('log level', 1);
});

socketio.configure('development', function(){
  socketio.set('log level', 1);
});

net.createServer(function(sock) {
  sock.on("data", function(data) {
    socketio.sockets.emit("dcf77signal", data.toString());
  });
}).listen(inputSettings.port, inputSettings.host);
console.log("input server listening on " + inputSettings.host +":"+ inputSettings.port);
