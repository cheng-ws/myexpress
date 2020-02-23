const express = require('express')
const router = express.Router()
const Person = require('../../db/mysqldb/model/Model')

router.get('/order',(req,res)=>{
    let {place_person}=req.query;
    let sql="SELECT * FROM t_places where place_person = ? order by time desc,place_time desc";
    let params = [place_person]
    Person.query(sql,params,function(err,result,fields){
     if(err){
         res.send({err:-1,msg:'查询失败',})
      }
      if(result&&result.length>0){
          
          res.send({err:0,msg:'查询数据库成功',data: result })
      }else{
          res.send({err:-1,msg:'查询失败'})
      }
    })
})
router.post('/ordersearch',(req,res)=>{
    let {place_person,time,place_name}=req.body;
    let sql="SELECT * FROM t_places where time like ? and  place_person = ? and place_name = ? order by time desc,place_time desc";
    let params = [time+'%',place_person,place_name]
    Person.query(sql,params,function(err,result,fields){
     if(err){
         res.send({err:-1,msg:'查询失败',})
      }
      if(result&&result.length>0){
          
          res.send({err:0,msg:'查询数据库成功',data: result })
      }else{
          res.send({err:-1,msg:'查询失败'})
      }
    })
})
router.post('/orderpage',(req,res)=>{
    let {page,pageSize,place_person} = req.body;
    console.log(page,pageSize,place_person)
    let current_page=1;
    let page_size=5;
    if(page) {
        current_page=parseInt(page)
    }
    if(pageSize) {
        page_size=parseInt(pageSize)
    }
    //设置最后一页页码
    var last_page = current_page-1;
    //假如目前仅有一页，则最后一页则为1
    if(current_page<=1) {
        last_page=1;
    }
    //如果需要下一页,则开启
    let next_page = current_page+1;
    let offsetnum = (current_page-1)*page_size
    let sql = 'select * from t_places where place_person = ? order by time desc,place_time desc limit ? offset ? '
    let sqlCount = 'select * from t_places where place_person = ?'
    let params = [place_person,page_size,offsetnum]
    let total=0;
    Person.query(sqlCount,params,function(err,result,fields) {
        if(err){
            res.send({err:-1,msg:'查询失败'})
        }else{
            total=result.length;
        }
    })
    Person.query(sql,params,function(err,result,fields){
     if(err){
         res.send({err:-1,msg:'查询失败',})
      }
      if(result&&result.length>=0){
          
          res.send({err:0,msg:'查询数据库成功',total:total,data: result})
      }else{
          res.send({err:-1,msg:'查询失败'})
      }
    })
})
router.post('/orderpagesearch',(req,res)=>{
    let {page,pageSize,place_person,time,place_name} = req.body;
    let current_page=1;
    let page_size=5;
    if(page) {
        current_page=parseInt(page)
    }
    if(pageSize) {
        page_size=parseInt(pageSize)
    }
    //设置最后一页页码
    var last_page = current_page-1;
    //假如目前仅有一页，则最后一页则为1
    if(current_page<=1) {
        last_page=1;
    }
    //如果需要下一页,则开启
    let next_page = current_page+1;
    let offsetnum = (current_page-1)*page_size
    let sql="select * from t_places where time like ? and  place_person = ? and place_name like ? order by time desc,place_time desc limit ? offset ? ";
    let sqlCount="select * from t_places where time like ? and  place_person = ? and place_name like ? order by time desc,place_time desc";
    let params = [time+'%',place_person,place_name+'%',page_size,offsetnum]
    let paramsCount = [time+'%',place_person,place_name+'%']
    let total=0;
    Person.query(sqlCount,paramsCount,function(err,result,fields) {
        if(err){
            res.send({err:-1,msg:'查询失败'})
        }else{
            total=result.length;
        }
    })
    Person.query(sql,params,function(err,result,fields){
     if(err){
         res.send({err:-1,msg:'查询失败',})
      }
      if(result&&result.length>=0){
          
          res.send({err:0,msg:'查询数据库成功',total:total,data: result})
      }else{
          res.send({err:-1,msg:'查询失败'})
      }
    })
})
router.post('/orderdel',(req,res)=>{
    let {id}=req.body;
    let params=[id]
    let sql = "update t_places set place_person='' where id=?"
    Person.query(sql,params,function(err,result,fields){
        if(err){
            res.send({err:-1,msg:'删除失败',})
         } 
         if(result&&result.affectedRows>0){
             
             res.send({err:0,msg:'删除成功'})
         }else{
             res.send({err:-1,msg:'删除失败'})
         }
       })
})
module.exports = router;