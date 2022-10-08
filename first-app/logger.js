const EventEmitter = require("events");
class Logger extends EventEmitter {
  log(message) {
    //send an http request
    console.log(message);

    //Raise an event: emitter.emit('事件名称',{事件参数 id:,url:})
    this.emit("messageLogged", {
      id: 1,
      url: "http://",
    });
  }
}

module.exports = Logger;
