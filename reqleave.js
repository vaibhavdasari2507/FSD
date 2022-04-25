const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema ({
    leavetype: {
        type: String,
        enum: ['Casual Leave 12 Days', 'Medical Leave', 'Loss of Pay']
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    days: {
        type: String,
        required: true
    },
    leavereason: {
        type: String,
        required: true
    }
})

// const Reqleave = mongoose.model('Reqleave', leaveSchema);
// module.exports = Reqleave;

module.exports = mongoose.model('Reqleave', leaveSchema);