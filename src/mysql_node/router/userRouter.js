const express = require('express')
const router = express.Router()
const User = require('../../db/mysqldb/model/Model')


router.post('/login',(req,res)=>{
    let {username,password}=req.body;
    let sql='select * from t_users where username = ? and userpassword = ?';
    let params = [username,password]
    User.query(sql,params,function(err,result,fields){
     if(err){
         res.send({err:-1,msg:'查询失败',})
      }
      if(result&&result.length>0){
          let {userpassword, ...data}=result[0];
          let sqlup=`update t_users set islogin= 1 where id = ${data.id}`
          User.query(sqlup,[],function(err1,result1,fields){
              if(err1){
                  res.send({err:-1,msg:"登录失败"})
              }else{
                  data.islogin=1
                  res.send({err:0,msg:"登录成功",data:data})
              }
          })
          
      }else{
          res.send({err:-1,msg:'没有此用户'})
      }
    })
})
router.get('/loginselect',(req,res)=>{
    let sql = 'select * from t_users where islogin=1'
    User.query(sql,[],function(err,result,fields){
        if(err){
            res.send({err:-1,msg:"查询失败",data:-1})
        }else {
            res.send({err:0,msg:"查询成功",data:result.length})
        }
    })
})
router.post('/loginout',(req,res)=>{
    let {id}=req.body;
    var sql = 'UPDATE t_users SET islogin = 0 WHERE id = ?';
    var params = [id];
    User.query(sql,params,function(err,result,fields){
        if(err){
            res.send({err:-1,msg:"退出登录失败"})
        }else {
            res.send({err:0,msg:"退出登录成功"})
        }
    }) 
})
router.post('/reg',(req,res)=>{
    let {username,password}=req.body;
    let sql = "INSERT INTO t_users(username, userpassword,islogin,role) VALUES (?,?,?,?)"
    let params = [username, password,'0','1'];
    User.query(sql, params, function (err,result, fields) {
         if(err){
            res.send({err:-1,msg:'注册失败'})
         }
         if(result&&result.affectedRows>0){
              res.send({err:0,msg:'注册成功'})
         }else{
              res.send({err:-1,msg:'注册失败'})
         }
    })
})
router.post('/update',(req,res)=>{
    let {id,sex,autograph}=req.body;
    var sql = 'UPDATE t_users SET sex = ?,autograph = ?  WHERE id = ?';
    var allsql='select * from t_users where id = ?';
    var params = [sex,autograph,id];
    User.query(sql,params, function (err,result, fields) {
         if(err){
            res.send({err:-1,msg:'更新失败',})
         }
         if(result&&result.affectedRows>0){
            //  res.send({err:0,msg:'更新成功',})
            var params1=[id]
            User.query(allsql,params1,function(err,result,fields) {
                if(err){
                    res.send({err:-1,msg:'更新失败，请刷新！',})
                 }
                 if(result&&result.length>0){
                     let {userpassword, ...data}=result[0];
                     res.send({err:0,msg:'更新并重新查询数据库成功',data: data})
                 }else{
                     res.send({err:-1,msg:'没有此用户'})
                 }
            })
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
router.post('/userpagesearch',(req,res)=>{
    let {page,pageSize,username} = req.body;
    let current_page=1;
    let page_size=10;
    if(page) {
        current_page=parseInt(page)
    }
    if(pageSize) {
        page_size=parseInt(pageSize)
    }

    let offsetnum = (current_page-1)*page_size
    let sql="select id,username,autograph,sex,role from t_users where username like ?  order by id asc limit ? offset ? ";
    let sqlCount="select id,username,autograph,sex,role from t_users where username like ?  order by id asc";
    let params = [username+'%', page_size,offsetnum]
    let paramsCount = [username+'%']
    let total=0;
    User.query(sqlCount,paramsCount,function(err,result,fields) {
        if(err){
            res.send({err:-1,msg:'查询失败'})
        }else{
            total=result.length;
            User.query(sql, params, function (err, result, fields) {
                if (err) {
                    res.send({ err: -1, msg: '查询失败', })
                }
                if (result && result.length >= 0) {
                    
                    res.send({ err: 0, msg: '查询数据库成功', total: total, data: result })
                } else {
                    res.send({ err: -1, msg: '查询失败' })
                }
            })
        }
    })
    
})
router.post('/rootupdate',(req,res)=>{
    let {id,sex,autograph,role}=req.body;
    var sql = "update t_users set sex= ?,autograph= ?,role = ? where id = ?"
    var params=[sex,autograph,role,id]
    User.query(sql,params,function(err,result,fields) {
        if(err){
            res.send({err:-1,msg:'更新失败',})
        } 
        if(result&&result.affectedRows>0){
            res.send({err:0,msg:"更新成功"})
        }else{
            res.send({err:-1,msg:'更新失败'})
        }
    })
})
router.post('/rootadd',(req,res)=>{
    let {username,userpassword,autograph,sex,role}=req.body;
    let sql = "INSERT INTO t_users(username,userpassword,autograph,sex,role) VALUES (?,?,?,?,?)"
    let params = [username,userpassword,autograph,sex,role];
    User.query(sql, params, function (err,result, fields) {
         if(err){
            res.send({err:-1,msg:'添加失败'})
         }
         if(result&&result.affectedRows>0){
              res.send({err:0,msg:'添加成功'})
         }else{
              res.send({err:-1,msg:'添加失败'})
         }
    })
})

module.exports = router;