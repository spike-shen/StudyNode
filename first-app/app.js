// //** OS Module*/
// const os = require('os');
// var totalMemory = os.totalmem();
// var freeMemory = os.freemem();
// console.log('totalmem:' + totalMemory);
// //template string
// console.log(`freemem:${freeMemory}`);

// //** File System Module*/
// const fs = require('fs');
// //返回当前文件夹的所有文件和文件夹（同步）
// // const files=fs.readdirSync('../');
// // console.log(files)
// //(异步Async)所有的异步方法都使用一个函数作为最后一个参数，node在异步操作完成后自动执行函数，称为callbac（函数回调函数）
// const files2 = fs.readdir('./', (err, files) => {
//     if (err) console.log(`Error:${err}`);
//     else console.log(`Results:${files}`);
// });

// //** Events Module*/
// //event is a signal that something has happended
// //首字母大写的变量约定俗成类，类包含属性和函数的容器，函数也叫方法
// //create instance of class(创建实例)  ——>类与实例的区别：The class is human,the Obj is actual person
// //emit:Making a noise,produce-signalling that the event has happened (emit提示事件发生)
// const EventEmitter = require('events');
// const emitter = new EventEmitter();
// //需要注册对messageLogged事件感兴趣的监听器，监听器是事件发生时被调用的函数
// //Register a listener: emitter.on('事件名称',callbackFuction(arg=事件参数))  emitter.addListener=emitter.on
// emitter.on('messageLogged', (arg) => {
//     console.log('listener called', arg)
// })


// //** Extending EventEmitter（扩展事件参数）*/
// const EventEmitter = require('events');
// const Logger = require('./logger');
// const logger = new Logger();
// //register a listener
// logger.on('messageLogged', (arg) => {
//     console.log('listener called:', arg)
// });
// logger.log('start');

// //** HTTP Module*/
// //创建一个服务监听给定的端口，就可以为客户端搭建后端服务
// //！创建一个网络应用的后端服务，需要处理很多的路由规则
// //一般不直接用http模块创建服务，而是使用Express工具
// const http = require('http');
// const server = http.createServer((req, res) => {
//     if (req.url === '/') {
//         res.write('hello world');
//         res.end();
//     };
//     if (req.url === '/api/courses') {
//         //用Josn格式返回对象
//         res.write(JSON.stringify([1, 2, 3]));
//         res.end();
//     }
// });
// server.listen(3000);
// console.log('Listening on port 3000..')