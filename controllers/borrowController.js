const Borrow = require('../models/Borrow');
const Return = require('../models/Return');
const Book = require('../models/Book');

exports.borrowBook = async (req, res) => {
  try {
    const { bookid } = req.body;
    const username = req.user.username;

    // Check if book is available
    const book = await Book.findById(bookid);
    if (!book || !book.available) {
      return res.status(400).json({ message: 'Book not available' });
    }

    // Create borrow record
    const borrowRecord = new Borrow({
      username,
      bookid,
      duedate: new Date(+new Date() + 15 * 24 * 60 * 60 * 1000)
    });

    // Update book availability
    book.available = false;
    await book.save();

    await borrowRecord.save();

    res.status(201).json({ 
      message: 'Book borrowed successfully', 
      borrowRecord 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error borrowing book', 
      error: error.message 
    });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const { bookid } = req.body;
    const username = req.user.username;

    // Find borrow record
    const borrowRecord = await Borrow.findOne({ bookid, username });
    if (!borrowRecord) {
      return res.status(404).json({ message: 'No borrow record found' });
    }

    // Calculate fine
    const dueDate = new Date(borrowRecord.duedate);
    const returnDate = new Date();
    let fine = 0;

    if (returnDate > dueDate) {
      const daysLate = Math.ceil((returnDate - dueDate) / (1000 * 60 * 60 * 24));
      fine = daysLate * 10; // 10 rupees per day late
    }

    // Create return record
    const returnRecord = new Return({
      username,
      bookid,
      duedate: borrowRecord.duedate,
      fine
    });

    // Update book availability
    const book = await Book.findById(bookid);
    book.available = true;
    await book.save();

    // Remove borrow record
    await Borrow.findByIdAndDelete(borrowRecord._id);
    await returnRecord.save();

    res.json({ 
      message: 'Book returned successfully', 
      returnRecord,
      fine 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error returning book', 
      error: error.message 
    });
  }
};