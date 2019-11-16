//  连接数据库
const mongoose =require('mongoose')
mongoose.connect('mongodb://localhost:27017/myexpresss',{ useNewUrlParser: true,useUnifiedTopology:true });
//连接数据库
var db = mongoose.connection;//数据库的连接对象
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db ok')
});