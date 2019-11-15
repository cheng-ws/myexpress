const express =require('express')
const router=express.Router()
const multer = require('multer')
const path=require('path')
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        //指定文件路径
        // cb(null,path.join(__dirname,'../uploads'))
        cb(null,'./src/static/images')
    },
    filename:function(req,file,cb){
        //指定文件名
        //文件名重复覆盖 后缀名发生改变
        // cb(null,'aaa.jpg');
        let exts=file.originalname.split('.')
        let ext=exts[exts.length-1]
        let tmpname=(new Date()).getTime()+parseInt(Math.random()*99999)
        cb(null,`${tmpname}.${ext}`)
    }

});
var upload = multer({
    storage:storage
})
router.post('/upload',upload.single('hehe'),(req,res)=>{
    //hehe 要上传图片数据的key值 必须前后端同一
    //{
    //     'hehe':图片数据
    // }
    // res.send('上传ok')
    // console.log(res.file);
    let {size,mimetype,path}=req.file;
    let types=['jpg','jpeg','png','gif'] //允许上传的数据类型
    let tmpType=mimetype.split('/')[1];
    if(size>=250000*4){
        return res.send({code:-1,msg:'尺寸过大'})
    }else if(types.indexOf(tmpType)==-1){
        return res.send({code:-1,msg:'媒体类型错误'})
    }else{
        let url="/public/images/"+req.file.filename
        res.send({code:0,msg:'ok',img:url})
    }
    
})
module.exports=router