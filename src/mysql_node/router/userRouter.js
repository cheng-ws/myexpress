const express = require('express')
const router = express.Router()
const User = require('../../db/mysqldb/model/Model')


router.get('/login',(req,res)=>{
    let {us,ps}=req.body;
    let sql='select * from t_users where username = ? and userpassword = ?';
    let params = [us,ps]
    User.query(sql,params,function(err,result,fields){
     if(err){
         res.send({err:-1,msg:'查询失败',})
      }
      if(result&&result.length>0){
          let {userpassword, ...data}=result[0];
          res.send({err:0,msg:'查询数据库成功',data: data})
      }else{
          res.send({err:-1,msg:'没有此用户'})
      }
    })
})
router.post('/reg',(req,res)=>{
    let {us,ps}=req.body;
    var sql = 'INSERT INTO t_users(username,userpassword) VALUES(?,?)';
    var params = [us, ps];
    
    User.query(sql, params, function (err,result, fields) {
         if(err){
            res.send({err:-1,msg:'注册失败',})
         }
         if(result&&result.affectedRows>0){
              res.send({err:0,msg:'注册成功',})
         }else{
             res.send({err:-1,msg:'注册失败',})
         }
    })
})
router.post('/update',(req,res)=>{
    let {us,ps}=req.body;
    var sql = 'UPDATE t_users SET userpassword = ?  WHERE username = ?';
    var params = [ps,us];
    User.query(sql,params, function (err,result, fields) {
         if(err){
            res.send({err:-1,msg:'更新失败',})
         }
         if(result&&result.affectedRows>0){
              res.send({err:0,msg:'更新成功',})
         }else{
             res.send({err:-1,msg:'更新失败',})
         }
    })
})
router.post('/del',(req,res)=>{
    let {id}=req.body;
    var sql = 'DELETE FROM t_users where id=?';
    var params = [id];
    User.query(sql,params, function (err,result, fields) {
         if(err){
            res.send({err:-1,msg:'删除失败',})
         }
         if(result&&result.affectedRows>0){
              res.send({err:0,msg:'删除成功',})
         }else{
             res.send({err:-1,msg:'删除失败',})
         }
    })
})
module.exports = router;