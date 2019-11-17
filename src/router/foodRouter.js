const express=require('express')
const router= express.Router()
const foodModel=require('../db/mongodb/model/foodModel')

/**
 * @api {post} /food/add  添加菜品
 * @apiName addfood
 * @apiGroup Food
 *
 * @apiParam {String} name  菜名
 * @apiParam {String} price  菜价.
 * @apiParam {String} desc   描述.
 * @apiParam {String} typename 菜的类型
 * @apiParam {Number} typeid   类型id
 * @apiParam {String} img    图片的地址   
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/add',(req,res)=>{
  // let data={
  //   name  : "菜名" ,
  //   price  : "20" ,
  //   desc : "描述" ,
  //   typename : "粤菜" ,
  //   typeid: 1,
  //   img: "/public/imgages/1.jpg"
  // }
  let {name,price,desc,typename,typeid,img} = req.body;
  //判断参数是否正确
  foodModel.insertMany({name,price,desc,typename,typeid,img})
  .then((data)=>{
    res.send({err:0,msg:'添加成功'})
  })
  .catch(()=>{
    res.send({err:-1,msg:'添加失败'})
  })
})
router.post('/getInfoById',(req,res)=>{
  let {_id}=req.body
  foodModel.find({_id})
  .then((data)=>{
    res.send({err:0,msg:'查询ok',list:data})
  })
  .catch(()=>{
    res.send({err:-1,msg:'查询失败'})
  })
})
/* 
*@api {post} /food/getInfoByType 分类查询
@apiName getInfoByType
@apiGroup Food

@apiParam {Number} typeid 类型id

*/
router.post('/getInfoByTypeid',(req,res)=>{
  let {typeid}=req.body
  if(typeid==="0"){
    foodModel.find()
    .then((data)=>{
      res.send({err:0,msg:'查询ok',list:data,total:data.length})
    })
    .catch(()=>{
      res.send({err:-1,msg:'查询失败'})
    })
  }else{
    foodModel.find({ typeid })
      .then((data) => {
        res.send({ err: 0, msg: '查询ok', list: data, total: data.length })
      })
      .catch(() => {
        res.send({ err: -1, msg: '查询失败' })
      })
  }
  
})
/* 
*@api {post} /food/getInfoByKw 关键字查询
@apiName getInfoByKw
@apiGroup Food

@apiParam {String} kw 关键字

*/
router.post('/getInfoByKw',(req,res)=>{
  //$set $gte $or $and $regex regexp
  let {kw}=req.body
  let reg=new RegExp(kw) //创建一个正则表达式 匹配关键字
  //foodModel.find({age:{$gte:16}})
  //foodModel.find({name:{$regex:reg}}) 名字模糊           
  foodModel.find({$or:[{name:{$regex:reg}},{desc:{$regex:reg}}]}) //名字 以及描述 模糊查询
  .then((data)=>{
    res.send({err:0,msg:'查询ok',total:data.length,list:data})
  })
  .catch(()=>{
    res.send({err:-1,msg:'查询失败'})
  })
})

router.post('/del',(req,res)=>{
  let {_id}=req.body;
  //单个删除 多个删除{_id:[id1,id2]}
  foodModel.remove({_id:_id})
  .then((data)=>{
    res.send({err:0,msg:'删除成功'})
  })
  .catch(()=>{
    res.send({err:-1,msg:'删除失败'})
  })
})

router.post('/update',(req,res)=>{
  let {_id,name,price,desc,typename,typeid,img} = req.body;
  foodModel.update({_id},{name,price,desc,typename,typeid,img})
  .then((data)=>{
    res.send({err:0,msg:'修改成功'})
  })
  .catch(()=>{
    res.send({err:-1,msg:'修改失败'})
  })
})


/* 

@api {post} /food/getInfoByPage   分页查询
@apiName getInfoByPage 
@apiGroup Food

@apiParam {Number} pageSize 每页数据条数
@apiParam {Number} page 哪一页


*/
router.post('/getInfoByPage',(req,res)=>{
  let pageSize=req.body.pageSize || 5;//设置默认值
  let page=req.body.page || 1;
  let count=0;
  foodModel.find()
  .then((list)=>{
    count=list.length //获取总的数据条数
    return  foodModel.find().limit(Number(pageSize)).skip(Number((page-1)*pageSize))
  })
  .then((data)=>{
    let allpage=Math.ceil(count/pageSize); //ceil向上取整
    res.send({err:0,msg:'分页查询成功',info:{list:data,count:count,allpage:allpage}})
  })
  .catch(()=>{
    res.send({err:-1,msg:'分页查询失败'})
  })
})
module.exports=router
 