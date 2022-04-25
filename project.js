const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
    projectName:{
        type:String,
        required:true
    },
    clientName:{
        type:String,
        required:true
    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    },
    budget:{
        type:String,
        required:true
    },
    priority:{
        type:String,
        required:true
    },
    projectLeader:{
        type:String,
        required:true
    },
    team : { 
        type : Array , default : [],
        required:true
    },
    pdescription:{
        type:String,
        required:true
    },
    progress:{
        type: String,
        default: 'Pending'            
    }
})
module.exports = mongoose.model('Project', projectSchema)
