const express = require('express')
const router = express.Router()
var User = require('../db/model/userModel')
var jwt =require('../util/jwt')
let codes = {}  //通过内存保存验证码


router.post('/reg', (req, res) => {
    // 获取数据
    let { us, ps } = req.body;
    //登录成功 将用户的相关信息存到session
//     req.session.login=true;
//     req.session.name=us;
//    console.log(req.session);
//    req.session.destroy()//清除session
//    req.redirect('/')
    
     
    // User.query('select * from t_users', [], function (result, fields) {
    //     console.log('查询结果：');
    //     console.log(result);
    // })
    // var addSql = 'INSERT INTO t_users(username,password) VALUES(?,?)';
    // var addSqlParams = [us, ps];
    // User.query(addSql, addSqlParams, function (result, fields) {
    //     console.log('添加成功')
    // })

    // if (us && ps) {
    //     User.find({ us })
    //         .then((data) => {
    //             if (data.length === 0) {
    //                 // 用户名不存在 可以注册
    //                 return User.insertMany({ us: us, ps: ps })
    //             } else {
    //                 res.send({ err: -3, msg: '用户名已存在' })
    //             }
    //         })
    //         .then(() => {
    //             res.send({ err: 0, msg: '注册ok' })
    //         })
    //         .catch((err) => {
    //             res.send({ err: -2, msg: '注册err' })
    //         })
    // } else {
    //     return res.send({ err: -1, msg: '参数错误' })
    // }
});
router.post('/login',(req,res)=>{
  let {us}=req.body;
  let token=jwt.creatToken({login:true,name:us})
  res.send({err:0,msg:'ok',token:token})
})
module.exports = router;