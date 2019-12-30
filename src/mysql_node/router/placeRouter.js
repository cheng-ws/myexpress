const express = require('express')
const router = express.Router()
const Place = require('../../db/mysqldb/model/Model')


router.get('/search',(req,res)=>{
    let {time,placeName}=req.query;
    let sql="SELECT * FROM t_places where  time like ? and place_name = ?";
    let params = [time+'%',placeName]
    console.log(params);
    
    Place.query(sql,params,function(err,result,fields){
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
router.post('/inset',(req,res)=>{
    let {id,status,place_person,place_time}=req.body;
    let sql="update t_places set status = ?,place_person = ?,place_time=? where id = ? ";
    let params = [status,place_person,place_time,id]
    
    Place.query(sql,params,function(err,result,fields){
     if(err){
         res.send({err:-1,msg:'插入数据失败',})
      } 
      if(result&&result.affectedRows>0){
          
          res.send({err:0,msg:'插入数据成功'})
      }else{
          res.send({err:-1,msg:'插入数据失败'})
      }
    })
})
router.post('/update',(req,res)=>{
    let {id,status,place_person,place_time}=req.body;
    let sql="update t_places set status = ?,place_person = ?,place_time=? where id = ? ";
    let params = [status,place_person,place_time,id]
    console.log(params);
    
    Place.query(sql,params,function(err,result,fields){
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