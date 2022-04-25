const mongoose = require('mongoose');
const clientSchema = new mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
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
    phone:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Client', clientSchema);
