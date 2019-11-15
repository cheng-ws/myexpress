const jwt = require('jsonwebtoken')


let screat='sssssdsalfaasdfadfadsfasfsafdsad' //产生token的私钥
let payload={
    us:123,
    ps:456
}
//产生一个token
 let token = jwt.sign(payload,screat)//hs256加密 数据 载荷 screat
// console.log(token);
// let token='JhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cyI6MTIzLCJwcyI6NDU2LCJpYXQiOjE1NzE2NTIzNzJ9.IO4hXzdGwtNdAQqtiLK6Z5najdp1p4QNRvfBAcch6to'
//验证token的合法性
jwt.verify(token,screat,(err,data)=>{
    console.log(err);
    console.log(data);
})