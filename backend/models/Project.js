const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        default: 'pending'
    },
    budget: {
        type: Number
    },
});

module.exports = mongoose.model('Project', projectSchema);