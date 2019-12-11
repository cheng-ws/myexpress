const WebSocket = require('ws');
const wss = new WebSocket.Server({ 
    port: 8000,//verifyClient:checkUser验证用户，要不要给连接
 }, () => {
     
    console.log('socket start');
})
let user={};
wss.on('connection',function(client,req){
     console.log(req.headers);
     
    client.on('message',function(message){
        console.log(`[SERVER] Received:$[message]`);
        client.send(`ECHD:${message}`,(err)=>{
            if(err){
                console.log(`[SERVER] error:$[err]`);
            }
        })
    })  
})
// function checkUser(info){
//     let url=info.req.url
//     console.log('通过连接'+url);
//     return true;
// }
// let user={}; //存储链接用户
// let online=0; //存储在线人数
// wss.on('connection',function(ws,req){
//     online=wss._server._connections;
//     console.log('当前在线'+online+'个连接');
//     ws.send('当前在线'+online+'个连接');
//     let i=req.url; //提取网址参数
//     let m = i.match(/(?<=\?)[^:]+?(?=:|$)/);    //提取我是谁,这部分代码只有第一次连接的时候运行,如果后面连接的m值相同,前面的连接会被覆盖身份
//     if(m){
//         user[m]=ws;
//     }
//     let u = i.match(/(?<=:).+?$/);//提取发给谁
//     ws.on('message',function(msg){
//         console.log('收到'+i+'的消息'+msg);
//         if(u){
//             if(user[u]){
//                 if(user[u].readyState===1){
//                     user[u].send(msg);//                 }else{
//                     ws.send('对方掉线')
//                 }
//             }else{
//                 ws.send('找不到对象')
//             }
//         }else{//广播
//            wss.clients.forEach(function each(client){
//                if(client!==ws && client.readyState===WebSocket.OPEN){
//                    client.send(msg)
//                }
//            })
//         }
//       if(online!=wss._server._connections){
//           online=wss._server._connections;
//           ws.send('当前在线'+online+'个连接');
//       }  
//     })
// })





// //保存用户
// var AllUserData = new Array();
// ws.on('connection',function(client){
//     console.log('client connected');
//     client.on('message',function(message){
//         console.log(message);
//         Temp = JSON.parse(message);
//         if(CheckIsNew(Temp)){
//             AllUserData.push({
//                 id:Temp.ID,
//                 name:client
//             });
//             console.log(AllUserData);
//         }else{
//             for(var i=0;i<AllUserData.length;i++){
//                 if(Temp.ID===AllUserData[i]['id']){
//                     if(Temp.Data!="userregister"){
//                         AllUserData[i]['name'].send(Temp.ID+Temp.Data);
//                         break;
//                     }
//                 }
//             }
//         }
//     });
// });
// function CheckIsNew(Temp){
//     for(var i=0;i<AllUserData.length;i++){
//         if(Temp.ID===AllUserData[i]['id']){
//             return false;
//         }
//     }
//     return true;
// }







// let clients = []
// let data=['什么是','我不懂','我只知道我是谁，不知道','你知道','可以解释下','我会百度','书中自有','百度一下，你就知道','谁知道','我也不知道']
// ws.on('connection', (client) => {
//     clients.push(client)
//     client.send('欢迎光临')//数据传输字符串
//     client.on('message', (msg) => {
//         console.log('来自前端的数据：' + msg);
//         let number=Math.floor(Math.random()*10)
//         console.log(data.length);
//         console.log(number)
//         client.send(data[number]+msg);
//         if (msg.indexOf('广播') != -1) {
//             sendAll()
//         }
//     })
//     client.on('close', (msg) => {
//         console.log('前端主动断开链接' + msg);
//     })
// })
// function sendAll() {
//     for (let i = 0; i < clients.length; i++) {
//         clients[i].send(clients[i].data)
//     }
// }
