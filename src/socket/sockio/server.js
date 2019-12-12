var express = require('express')
var app = express()
var server = require('http').Server(app);
var io=require('socket.io')(server);
//将socket 服务器和express 进行结合
app.use(express.static(__dirname+'/'))
var users = {};//  sid  socket
var reflect = {};//  name  sid
//客户端链接
io.on('connection',function(socket){
   socket.emit('login','loginSuccess')
        // io.sockets.emit('servers', '欢迎加入');
    //    socket.on('serve',function(name,cb){
    //        console.log(name);
    //        cb('已发送')
    //    })
       socket.on('private message', function (from,to,msg) {
        console.log('I received a private message by ', from, ' say to ',to, msg);
        if(reflect[to] in users){
            users[reflect[to]].emit('to'+to,{to:to,from:from,message:msg});
        }
      });
      socket.on('new user',function(data){
         if(socket.id in users){
                 io.sockets.emit('servers',data); 
         }else{
              reflect[data] = socket.id;
              users[socket.id] = socket;
              io.sockets.emit('servers',data);
         }
        //  console.info(users);
      });
      socket.on('disconnect', function () {
        io.sockets.emit('user disconnected');
      });
    // setInterval(function(){
    //     socket.emit('list','abc')
    // },1000)
    // socket.broadcast.emit('list','test');
    // socket.on('backend',(msg)=>{
    //     console.log(msg);
    // })
    // socket.on('receive',(msg)=>{
    //     socket.broadcast('message',msg)
    // })
})
server.listen(3000,function(){
    console.log('链接成功');
    
})  