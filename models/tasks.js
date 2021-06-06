const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    assigned_by:{
        type: String,
        required: true
    },
    assigned_to:{
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Task', taskSchema);