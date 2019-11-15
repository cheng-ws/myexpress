const mongoose=require('mongoose')
var foodSchema = new mongoose.Schema({
  name  : {type:String,required:true},
  price  : {type:String,required:true},
  desc : {type:String,required:true},
  typename : {type:String,required:true},
  typeid:{type:Number,required:true},
  img:{type:String,required:true}
});

// 将schema 对象转化为数据模型
var Food = mongoose.model('foods', foodSchema);//该数据对象和集合关联('集合名',schema对象)

module.exports=Food