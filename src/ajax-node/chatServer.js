var http=require("http");
var msgList=[]
var strMath = require("querystring");
var server = http.createServer(function(req,res) {
    var str="";
  req.on("data",function(data) {
      str+=data;
  
  });
  req.on("end",function(){
     
      var obj=JSON.parse(decodeURIComponent(str));
      if(obj.type===1){
          msgList.push({name:obj.name,msg:obj.msg,date:obj.date});
      }
      res.writeHeader(200,{"content-type":"text/html","Access-Control-Allow-Origin":"*"})
      res.write(encodeURIComponent(JSON.stringify({result:msgList,error:null})));
      res.end();
  })
});
server.listen(4000,"192.168.1.174",function(){
    console.log('开启服务')
})