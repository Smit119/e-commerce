const mongoose = require('mongoose')

const AVTAR_PATH = '/uploads'

const multer = require('multer')

const path = require('path')

const ModelSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true,
        default : 'Admin',
    },
    profile : {
        type : String,
        required : true
    },
    isActive :
    {
        type : Boolean,
        default : true
    } 
})

const imageStorage = multer.diskStorage({
    destination : function(req,file,cb) {
        cb(null,path.join(__dirname,'..',AVTAR_PATH))
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now())
    }
})

ModelSchema.statics.uploadedAvtar = multer({storage : imageStorage}).single('profile')
ModelSchema.statics.avtarPath = AVTAR_PATH

const files = mongoose.model('files',ModelSchema)

module.exports = files;