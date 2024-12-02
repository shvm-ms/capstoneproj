// models/Borrow.js
const mongoose = require('mongoose');

const BorrowSchema = new mongoose.Schema({
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
    default: () => new Date(+new Date() + 15 * 24 * 60 * 60 * 1000),
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Borrow', BorrowSchema);