const express = require('express');
// const db = require('../db/mysqldb/model/userModel')
const app = express()
const path = require('path');
const bodypaser=require('body-parser')
app.use(bodypaser.urlencoded({extended:false}))
app.use(bodypaser.json())

//路由
const userRouter = require('./router/userRouter');
const placeRouter = require('./router/placeRouter');
const personRouter = require('./router/personRouter');
app.use('/user',userRouter);
app.use('/place',placeRouter);
app.use('/person',personRouter);
app.listen(4000,()=>{
    console.log('server start')
})