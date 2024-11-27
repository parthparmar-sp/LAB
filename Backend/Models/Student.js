const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var studentSchema = new mongoose.Schema({
    role: {
        type: String,
        default: "student",
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Export the model
module.exports = mongoose.model('Student', studentSchema);
