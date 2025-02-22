const path=require('path');

const fileTypeValidator=(file)=>{
   //console.log(file);
    const fileTypes=/jpeg|jpg|png|gif|csv|pdf|ppt/;
    console.log("path.extname(file.originalname) || file.mimetype:",path.extname(file.originalname),file.mimetype);
    const extname=fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType=fileTypes.test(file.mimetype);
    return extname && mimeType;
}

module.exports=fileTypeValidator;

