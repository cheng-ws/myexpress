var http=require("http");
var strMath = require("querystring");
var server = http.createServer(function(req,res) {
    var str="";
  req.on("data",function(data) {
      str+=data;
    //  console.log(data.toString())
  });
  req.on("end",function(){
      console.log(req.url);
    //   var obj=strMath.parse(req.url.split("?")[1]);
    // var obj=strMath.parse(str);
    //json参数
    // var obj=JSON.parse(str);
    //   var obj=JSON.parse(decodeURIComponent(str))
    //   console.log(obj)
    //   obj.age=Number(obj.age)+5;
      res.writeHeader(200,{"content-type":"text/html","Access-Control-Allow-Origin":"*"})
    //   res.write(encodeURIComponent(JSON.stringify(obj)));
      res.end();
  })
});
server.listen(4000,"192.168.1.174",function(){
    console.log('开启服务')
})