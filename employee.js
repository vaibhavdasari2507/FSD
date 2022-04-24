const mongoose = require('mongoose');
mongodb = require('mongodb');
const employeeSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    uname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    pwd:{
        type:String,
        required:true
    },
    eid:{
        type:String,
        required:true
    },
    jdate:{
        type:Date,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Employee', employeeSchema);

