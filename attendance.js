const mongoose = require('mongoose');
const attendanceSchema = new mongoose.Schema({
    name: String,
    att:{
        type:[String],
        enum:['p','a']
    }
})
module.exports = mongoose.model('Attendance', attendanceSchema)
