
const cloudinary =require('cloudinary').v2;


 const cloudinaryConfig=()=>{
    cloudinary.config({
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_API_SECRET
    });
};

const uploadToCloudinary=async(filePath)=>{
    try{
        cloudinaryConfig();
        const result=await cloudinary.uploader.upload(filePath,{
        api_key:process.env.CLOUDINARY_API_KEY,
      });
      return result;

    }catch(error){
        console.error(error)
    }
};

module.exports=uploadToCloudinary;


