const express = require('express')
const router = express.Router()
const Place = require('../../db/mysqldb/model/Model')

router.get('/typenames',(req,res)=>{
    let sql = "select * from t_placenames"
    Place.query(sql,[],function(err,result,fields) {
        if(err){
            res.send({err:-1,msg:'查询失败',})
         }
         if(result&&result.length>=0){
             
             res.send({err:0,msg:'查询数据库成功',data: result})
         }else{
             res.send({err:-1,msg:'查询失败'})
         }
    })
})
router.post('/search',(req,res)=>{
    let {time,placeName}=req.body;
    let sql="SELECT * FROM t_places where  time like ? and name = ?";
    let params = [time+'%',placeName]
    
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
router.post('/rootsearch',(req,res)=>{
    let {time,place_title}=req.body;
    let sql="SELECT * FROM t_places where  time like ? and place_name = ?";
    let params = [time+'%',place_title]
    
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
router.post('/rootdel',(req,res)=>{
    let {id}=req.body;
    var sql = 'DELETE FROM t_places where id=?';
    var params = [id];
    Place.query(sql,params, function (err,result, fields) {
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
router.post('/rootadd',(req,res)=>{
    let {place_name,place_title,time} = req.body;
    let sql = 
   `INSERT INTO t_places (id, name, place_name, place_id, title, description, status, time, place_person, place_time) VALUES 
    (null, '${place_name}', '${place_title}', '一', '06:00-08:00', '呵护场地，伴我们成长', 0, '${time} 08:00:00', '', NULL),
    (null, '${place_name}', '${place_title}', '二', '08:00-10:00', '呵护场地，伴我们成长', 0, '${time} 10:00:00', '', NULL),
    (null, '${place_name}', '${place_title}', '三', '10:00-12:00', '呵护场地，伴我们成长', 0, '${time} 12:00:00', '', NULL),
    (null, '${place_name}', '${place_title}', '四', '12:00-14:00', '呵护场地，伴我们成长', 0, '${time} 14:00:00', '', NULL),
    (null, '${place_name}', '${place_title}', '五', '14:00-16:00', '呵护场地，伴我们成长', 0, '${time} 16:00:00', '', NULL),
    (null, '${place_name}', '${place_title}', '六', '16:00-18:00', '呵护场地，伴我们成长', 0, '${time} 18:00:00', '', NULL),
    (null, '${place_name}', '${place_title}', '七', '18:00-20:00', '呵护场地，伴我们成长', 0, '${time} 20:00:00', '', NULL),
    (null, '${place_name}', '${place_title}', '八', '20:00-22:00', '呵护场地，伴我们成长', 0, '${time} 22:00:00', '', NULL);`
    let params=[]
    let sqlSearch="SELECT * FROM t_places where  time like ? and place_name = ?";
    let params1 = [time+'%',place_title]

    Place.query(sqlSearch,params1,function(err,result,fields){
        if(err){
            res.send({err:-1,msg:"新建查询失败",data:0})
        }else{
            if(result&&result.length>0){
                  res.send({err:-1,msg:'新建内容已存在',data:1})
            }else{
                Place.query(sql, params, function (err1, result1, fields) {
                    if (!err1) {
                        res.send({ err: 0, msg: '新建成功', data: result1 })
                    } else {
                        res.send({ err: -1, msg: '新建失败',data:0 })
                    }
                })
            }
        }
    })
    
})
router.post('/rootdelall',(req,res)=>{
    var {time,place_title}=req.body;
    let params = [time+'%',place_title]
    var sql = 'DELETE FROM t_places where time like ? and place_name = ?';
    Place.query(sql,params, function (err,result, fields) {
         if(!err){
             if(result&&result.affectedRows>0){
                 res.send({err:0,msg:'删除成功',})
             }else{
                 res.send({err:-1,mag:'数据不存在',data:0})
             }
             
         }else{
             res.send({err:-1,msg:'删除失败',data:-1})
         }
    })
})
module.exports = router;