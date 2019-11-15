const express = require('express');
const app = express();
// const session=require('express-session')
const jwt = require('./util/jwt')
const bodypaser = require('body-parser')
app.use(bodypaser.urlencoded({ extended: false }))
app.use(bodypaser.json())


//session 整体配置
// app.use(session({
//     secret:'ssss',//为了安全性的考虑设置secret属性
//     cookie:{maxAge:60*1000},//设置过期时间
//     resave:true,//即使session没有被修改，也保存session值，默认为true,
//     saveUninitialized:false,//无论有没有session cookie，每次请求都设置个session cookie 默认给个
// }))
//路由
const userRouter = require('./router/userRouter')

app.use('/food', (req, res, next) => {
    console.log(req.body);
    let { token } = req.body;
    jwt.checkToken(token)
        .then((data) => {
            console.log(data);
            
            next()
        })
        .catch((err) => {
            res.send({ err: -1, msg: 'token 非法' })
        })
})
app.use('/user',userRouter)
// app.use('/user',(req,res,next)=>{
//     // console.log(req.body);
//     // console.log(req.session);
//     if(req.session.login){
//         next()
//     }else{
//         res.send({err:-99,msg:'请先登录'})
//     }
// },userRouter)




app.listen(3006, () => {
    console.log('server start !');
})