var net = require("net"),
    Gpio = require("onoff").Gpio,
    Signal = require("./lib/signal.js"),

    settings = {
      gpio: {
        port: 17,
        bindOptions: {
          persistentWatch: true
        }
      },
      server: {
        // the servers IP address
        host: "1.2.3.4",
        port: 20042
      }
    };

function onClientConnect()
{
  console.log("connected!");
  signal.bindTcpConnection(client);
}

function onClientError()
{
  console.log("connection lost...");
  process.exit();
}

var antenna = new Gpio(settings.gpio.port, "in", "both", settings.gpio.bindOptions),
    signal = new Signal(),
    client = new net.Socket();

client.setNoDelay(true);
client.connect(settings.server.port, settings.server.host);
client.on("connect", onClientConnect)
      .on("end", onClientError)
      .on("timeout", onClientError)
      .on("error", onClientError)
      .on("close", onClientError);

antenna.watch(function(err, value) {
  if(err) return;
  signal.receiveBit(value);
});
