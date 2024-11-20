const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var complaintSchema = new mongoose.Schema({
    labnum: {
        type: String,
        required: true,
    },
    computernum: {
        type: String,
        required: true,
    },
    copmplaindes: {
        type: String,
        required: true,
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student', // References the Student model
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Export the model
module.exports = mongoose.model('Complaint', complaintSchema);
