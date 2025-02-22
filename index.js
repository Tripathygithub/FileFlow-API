const express=require('express');
const app=express();
const port= 3000;
app.use(express.json());

const fs=require('fs');
const fileURLToPath=require("url");
const path=require("path");



const uploadDir = path.join(__dirname,"uploads");
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}
const fileRouter=require('./routes/route.js');
app.use('/',fileRouter);

app.listen(port,()=>{
    console.log(`server is listening at port ${port}`);
});
