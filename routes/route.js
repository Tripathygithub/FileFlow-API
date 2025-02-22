const route=require('express').Router();
const {createFolder,updateFolder, deleteFolder,uploadFile,deleteFile,getFolders,getFilesInOneFolder,sortFiles,getSpecificFileType}=require('../controllers/controller.js');
const multer=require('multer');
const isFilePresent=require('../middlewares/isFilePresent.js');
const upload=require('../fileUpload.js');
const UNEXPECTED_FILE_TYPE=require('../constants/file.js');
const path =require('path');
const authenticateJWT=require('../middlewares/authentication.js');

route.post('/folder/create',createFolder);
route.put('/folder/:folderId',updateFolder);
route.delete('/folder/:folderId',deleteFolder);
route.post('/folders/:folderId/files',
   authenticateJWT,   
    function(req,res,next){ 
    upload(req,res,function(err){
     // console.log(req.files[0].path); 
      if(err instanceof multer.MulterError){
         if(err.code === UNEXPECTED_FILE_TYPE.code){
             return res.status(400).json({error :{description : err.field}});
         }
      }else if(err){
         return res.status(500).json({error:{description:err.message}});
      }
      next();
    });
 
 },isFilePresent,uploadFile);

 route.delete('/folders/:folderId/files/:fileId',deleteFile);
 route.get('/folders',getFolders);
 route.get('/folders/:folderId/files',getFilesInOneFolder);
 route.get('/folders/:folderId/files-by-sort',sortFiles);
 route.get('/files',getSpecificFileType);

module.exports=route;