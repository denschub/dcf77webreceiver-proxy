function Signal()
{
  var now = new Date().getTime();
  this._lastFlap = 0;
  this._tcpConnection = null;
  this._highAt = now;
  this._lowAt = now;
  this._break = 0;
  this._length = 0;
}

Signal.prototype = {
  bindTcpConnection: function(tcpConnection)
  {
    this._tcpConnection = tcpConnection;
  },

  removeTcpConnection: function()
  {
    this._tcpConnection = null;
  },

  receiveBit: function(value)
  {
    var now = new Date().getTime();
    if((now - this._lastFlap) > 80) {
      this._lastFlap = now;
      if(value) {
        this.highNow();
      }
      else {
        this.lowNow();
      }
    }
    else {
      console.log("...gobbledygook...");
    }
  },

  highNow: function()
  {
    var now = new Date().getTime(),
        signalBreak = this.getDifference(now, this._lowAt);

    if(this.validSignalTimespan(null, signalBreak)) {
      this._highAt = now;
      this._break = signalBreak;
    }
  },

  lowNow: function()
  {
    var now = new Date().getTime(),
        signalLength = this.getDifference(this._highAt, now);

    if(this.validSignalTimespan(signalLength)) {
      this._lowAt = now;
      this._length = signalLength;
      this.send();
    }
  },

  getDifference: function(high, low) {
    return Math.abs(high - low);
  },

  validSignalTimespan: function(signalTimespan, signalBreak)
  {
    signalTimespan = typeof signalTimespan !== "undefined" ? signalTimespan : null;
    signalBreak = typeof signalBreak !== "undefined" ? signalBreak : null;

    if((signalBreak !== null) && ((signalBreak < 50) || (signalBreak > 60000)))
      return false;

    if((signalTimespan !== null) && ((signalTimespan < 50) || (signalTimespan > 60000)))
      return false;

    return true;
  },

  send: function()
  {
    var packet = "[" + this._break + "|" + this._length + "]";
    if(this._tcpConnection) {
      this._tcpConnection.write(packet);
    }
  }
};

module.exports = Signal;
