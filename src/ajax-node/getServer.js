var http=require("http");
var strMath = require("querystring");
var server = http.createServer(function(req,res) {
  req.on("data",function(data) {

  });
  req.on("end",function(){
      console.log(req.url);
      var obj=strMath.parse(req.url.split("?")[1]);
      console.log(obj)
      obj.age=Number(obj.age)+5;
      res.writeHeader(200,{"content-type":"text/html","Access-Control-Allow-Origin":"*"})
      res.write(JSON.stringify(obj));
      res.end();
  })
});
server.listen(4000,"192.168.1.174",function(){
    console.log('开启服务')
})