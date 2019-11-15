const express=require('express')
const db=require('./db/mongodb/connect')
const app=express()
const path=require('path')
// const Mail=require('./utils/mail')
// console.log(Mail)
const bodypaser=require('body-parser')
app.use(bodypaser.urlencoded({ extended: false }))
app.use(bodypaser.json())

//通过cors 解决跨域问题
// const cors = require('cors')
// app.use(cors())

//静态资源路径
app.use('/public',express.static(path.join(__dirname,'./static')))
// 路由
const userRouter = require('./router/userRouter')
const foodRouter = require('./router/foodRouter')
const fileRouter = require('./router/fileRouter')
app.use('/user',userRouter)
app.use('/food',foodRouter)
app.use('/file',fileRouter)

app.listen(4000,()=>{
  console.log('server start')
})