import express from "express";
const app = express();
 app.get("/", (res, req, next)=>{
     res.send({
          name:"anil"
       })
 })
app.listen(3000, (res, req) => {
  console.log("this server is working");
   
});
