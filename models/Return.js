// models/Return.js
const mongoose = require('mongoose');

const ReturnSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true 
  },
  bookid: { 
    type: mongoose.Schema.Types.ObjectId, 
    unique: true, 
    ref: 'Book',
    required: true
  },
  duedate: { 
    type: Date, 
    ref: 'Borrow',
    required: true
  },
  fine: { 
    type: Number,
    default: 0 
  }
}, { timestamps: true });

module.exports = mongoose.model('Return', ReturnSchema);