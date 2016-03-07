dcf77webreceiver-proxy
======================

The dcf77webreceiver is a proof-of-concept web application to receive and decode
[DCF77 time information](http://en.wikipedia.org/wiki/DCF77) from inside the
browser via an antenna connected to a Raspberry Pi.

This is the proxy, a Node.js application to receive the signals from the server
and relaying them to the browser via Socket.io. There is no signal processing
in this component.

See [the main repositories README](https://github.com/denschub/dcf77webreceiver/blob/master/README.md)
for more information about this project.

Installation
------------

As this is more of a proof-of-concept, I cannot provide clear installation
instructions. If you want to use this source and you run into troubles, please
open an issue and we will figure out what went wrong. However, some general
hints:

Copy `config.json.example` to `config.json`. Set your `input` settings to the
right values. `host` is the host the server will bind to, `port` is the port it
will listen on. The port should match with the clients settings. `output.port`
is the port the socket.io server will listen on. Configure your reverse proxy
(nginx for example) to serve Socket.io requests to this port.

After that, install the dependencies with `npm install` and run the proxy with
`node index.js`.
