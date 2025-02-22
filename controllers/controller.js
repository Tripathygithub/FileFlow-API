
const  sequelize  = require('../models/index.js').sequelize;
const Sequelize=require('sequelize');
const Folder=require('../models/Folder.js')(sequelize,Sequelize.DataTypes);
const File=require('../models/File.js')(sequelize,Sequelize.DataTypes);
const cloudinaryUpload=require('../servie/fileService.js');
const path=require('path');
const { message } = require('../constants/file.js');
async function isUniqueString(name){
    const response=await Folder.findOne({where:{name}});
    if(response)
        return false;
    else
      return true;
}

function isValidType(type){
    const typeArray=['csv', 'img', 'pdf', 'ppt'];
    const response=typeArray.find(ele => ele===type);
    if(response)
        return true;
    else
        return false;
}

const createFolder=async(req,res)=>{
    try{
    const newFolder=req.body;
    if(!await isUniqueString(newFolder.name))
        return res.json({message:"Folder name is not unique"});
    if(!isValidType(newFolder.type))
        return res.json({message:"File type is not valid"});
    if(newFolder.maxFileLimit <= 0)
        return res.json({message:"maximum File limit should be an Positive Integer"}); 
    const response=await Folder.create(newFolder);
    res.status(200).json({message:"Folder Added successfully",response});

    }catch(error){
        return res.status(500).json({error:error.message});
    }
};

async function isvalidFolderId(folderId){
   const response=await Folder.findOne({where:{folderId}});
   if(response)
      return true;
    else
      return false;
}

const updateFolder=async(req,res)=>{
    try{
    const folderId=req.params.folderId;
    const {name,type,maxFileLimit}=req.body;
    if(!await isvalidFolderId(folderId))
        return res.json({message:"Invalid Folder Id"});
    if(!isValidType(type))
        return res.json({message:"File type is not valid"});
    if(maxFileLimit <= 0)
        return res.json({message:"maximum File limit should be an Positive Integer"}); 

    await Folder.update({name,type,maxFileLimit},{where:{folderId}});    
    const response=await Folder.findOne({where:{folderId}});
    res.status(200).json({message:"Folder updated successfully",response}); 
    }catch(error){
        return res.status(500).json({error:error.message});
    }
};

const deleteFolder=async(req,res)=>{
    try{
    const folderId=req.params.folderId;
    if(!await isvalidFolderId(folderId))
        return res.json({message:"Invalid Folder Id"});
    const response=await Folder.destroy({where:{folderId}});
    if(response===0)
         res.json({message:"No Folder deleted"});
    else
    res.status(200).json({message:"Folder is deleted successfully"});    
    }catch(error){
        return res.status(500).json({error:error.message});
    }
};

async function isFileTypeValidForFolder(folderId,fileType){
    const folder=await Folder.findOne({
        where:{folderId},
    });
    if(folder.type===fileType.replace(".",""))
         return true;
    else
       return false;    
}

async function hasFolderReachedMaxLimit(folderId){
    const files=await File.findAll({Where:{folderId}});
    const folder=await Folder.findOne({
        where:{folderId},
    });
    if(files.length < folder.maxFileLimit)
        return false;
    else
       return true;
}

function validateFileSize(fileSize){
    if(fileSize <= 10 * 1024 * 1024)
        return false;
    else
        return true;
}
async function uploadFile(req, res) {

    let folderId = req.params.folderId;
    if(!await isvalidFolderId(folderId))
        return res.json({message:"Invalid Folder Id"});
   
    try {
        if (!req.files) {
            return res.status(400).json({ error: { description: "File not present in the request body" } });

        }

        if (Array.isArray(req.files) && req.files.length === 0) {
            return res.status(400).json({ error: { description: "No file uploaded" } });
        }

        const file = req.files[0];
        let response;
        const fileType = path.extname(file.originalname);
        if(!await isFileTypeValidForFolder(folderId,fileType))
             return res.json({message :"File type is not valid for this Folder"});
        if(await hasFolderReachedMaxLimit(folderId))    
             return res.json({message:"Folder maximum file limit reached.You can not add file to this folder"});
        if(validateFileSize(file.size))    
            return res.json({messsage :"upload a file less than 10 MB"});
        if (fileType === '.png' || fileType === '.jpg' || fileType === '.jpeg')
            response = await cloudinaryUpload(file);

        response = await File.create({
            folderId: folderId,
            name: file.originalname,
            description: 'monthly new report',
            type: file.mimetype,
            size: file.size,
        });

        res.status(200).json({ message: "File uploaded successfully", uploadResult: response });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteFile=async(req,res)=>{
    try{
    let folderId=req.params.folderId;
    let fileId=req.params.fileId;
    const response=await File.destroy({
        where:{fileId,folderId}
    });
    if(response===0)
        return res.json({message:"file is not deleted"});
    else
        return res.status(200).json({message:"File deleted successfully"});

    }catch(error){
        res.status(500).json({error:error.message});
    }
};

const getFolders=async(req,res)=>{
    try{
     let folders=await Folder.findAll();
     if(folders.length===0)
         return res.status(404).json({message:"no folder found"});
     res.status(200).json({folders:folders});
    }catch(error){
        res.status(500).json({error:error.message});
    }
};

const getFilesInOneFolder=async(req,res)=>{
    try{
     let folderId=req.params.folderId;
     let files=await File.findAll({where:{folderId}});
     if(files.length===0)
        return res.status(404).json({message:"no file found in this folder"});
     res.status(200).json({files:files});
    }catch(error){
        res.status(500).json({error:error.message});
    }
};

const sortFiles=async(req,res)=>{
    try{
     let folderId=req.params.folderId;   
     let sort=req.query.sort;
     let sortedFiles=await File.findAll({
        where:{folderId},
        order:[[sort,'ASC']]
     });
     res.status(200).json({sortedFiles:sortedFiles});   

    }catch(error){
        res.status(500).json({error:error.message});
    }
};

const getSpecificFileType=async(req,res)=>{
    try{
        let type=req.query.type;
        let files=await File.findAll({Where:type});
        if(files.length===0)
             return res.status(404).json({message:"This type of file is not present"});
        res.status(200).json({files:files});    
    }catch(error){
        res.status(500).json({error:error.message});
    }
};

module.exports={createFolder,updateFolder,deleteFolder,uploadFile,deleteFile,getFolders,getFilesInOneFolder,sortFiles,getSpecificFileType};