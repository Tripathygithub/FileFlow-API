const uploadToCloudinary=require('../cloudinary/cloudinary.js');
const fs=require('fs');

const cloudinaryUpload=async(file)=>{
    try{
    console.log("file path ", file.path);
    const cloudinaryResponse=await uploadToCloudinary(file.path);
    fs.unlink(file.path,(err)=>{
        if(err){
            console.error(err);
        }
    });
     return cloudinaryResponse;
    }catch(error){
        console.error(error);
    }
};

module.exports=cloudinaryUpload;




