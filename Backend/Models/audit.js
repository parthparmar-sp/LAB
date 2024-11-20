const mongoose = require('mongoose'); 
const auditSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    require:true
},
  email: {
    type: String,
  },
  date: { type: Date, default: Date.now },
  ipAddress: { type: String },
});
module.exports = mongoose.model('audit', auditSchema);