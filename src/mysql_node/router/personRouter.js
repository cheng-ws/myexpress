const express = require('express')
const router = express.Router()
const Person = require('../../db/mysqldb/model/Model')

router.get('/search',(req,res)=>{
    let {place_person}=req.query;
    let sql="SELECT * FROM t_places where place_person = ?";
    let params = [place_person]
    Person.query(sql,params,function(err,result,fields){
     if(err){
         res.send({err:-1,msg:'查询失败',})
      }
      if(result&&result.length>0){
          
          res.send({err:0,msg:'查询数据库成功',data: result})
      }else{
          res.send({err:-1,msg:'查询失败'})
      }
    })
})
router.post('/update',(req,res)=>{
    let {id,status,place_person,place_time}=req.body;
    let sql="update t_places set status = ?,place_person = ?,place_time=? where id = ? ";
    let params = [status,place_person,place_time,id]
    console.log(params);
    
    Person.query(sql,params,function(err,result,fields){
     if(err){
         res.send({err:-1,msg:'预约失败',})
      } 
      if(result&&result.affectedRows>0){
          
          res.send({err:0,msg:'预约成功'})
      }else{
          res.send({err:-1,msg:'预约失败'})
      }
    })
})
module.exports = router;