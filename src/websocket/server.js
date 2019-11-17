const WebSocket = require('ws');
const ws = new WebSocket.Server({ port: 8000 }, () => {
    console.log('socket start');
})

let clients = []
let data=['什么是','我不懂','我只知道我是谁，不知道','你知道','可以解释下','我会百度','书中自有','百度一下，你就知道','谁知道','我也不知道']
ws.on('connection', (client) => {
    clients.push(client)
    client.send('欢迎光临')//数据传输字符串
    client.on('message', (msg) => {
        console.log('来自前端的数据：' + msg);
        let number=Math.floor(Math.random()*10)
        console.log(data.length);
        console.log(number)
        client.send(data[number]+msg);
        if (msg.indexOf('广播') != -1) {
            sendAll()
        }
    })
    client.on('close', (msg) => {
        console.log('前端主动断开链接' + msg);
    })
})
function sendAll() {
    for (let i = 0; i < clients.length; i++) {
        clients[i].send(clients[i].data)
    }
}
