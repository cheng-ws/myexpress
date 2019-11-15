const mongoose=require('mongoose')
var userSchema = new mongoose.Schema({
  us  : {type:String,required:true},
  ps  : {type:String,required:true},
  // sex : {type:Number,default: 0}

});

// 将schema 对象转化为数据模型
var User = mongoose.model('user', userSchema);//该数据对象和集合关联('集合名',schema对象)

module.exports=User