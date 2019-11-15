const jwt = require('jsonwebtoken')
const scrict='sdsdafadsfasdfadf'
function creatToken(payload){
    //产生token
    payload.ctime=Date.now()//创建时间
    payload.exp=1000*60*24*7
    return jwt.sign(payload,scrict)
}
function checkToken(token){
    return new Promise((resolve,reject)=>{
        jwt.verify(token,scrict,(err,data)=>{
            if(err){reject('token 验证失败')}
            resolve(data)
        })
    })
}
module.exports={
    creatToken,checkToken
}