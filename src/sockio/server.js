var express = require('express')
var app = express()
var server = require('http').Server(app);
var io=require('socket.io')(server);
//将socket 服务器和express 进行结合
app.use(express.static(__dirname+'/client'))
let user=['a','b']
//客户端链接
io.on('connection',function(client){
    // client.emit('hehe','欢迎光临')
    client.on('serve',(msg)=>{
        console.log(msg);
         if(msg.name){
            if(user.indexOf(msg.name)>-1){
                console.log('1');
                console.log(msg.name);
                
               client.emit(msg.name,'1')
            }else{
                console.log('2');
                
                user.push(msg.name)
                client.emit(msg.name,'1')
            }
         }else{
             console.log('3');
             
             client.emit(msg.to,{...msg})
         }
    })
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
 
server.listen(8081,'0.0.0.0') //允许所有端口访问