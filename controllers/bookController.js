// controllers/bookController.js
const Book = require('../models/Book');

exports.createBook = async (req, res) => {
  try {
    const { name, author, genre, type } = req.body;

    const newBook = new Book({
      name,
      author,
      genre,
      type,
      available: true
    });

    await newBook.save();

    res.status(201).json({ 
      message: 'Book created successfully', 
      book: newBook 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error creating book', 
      error: error.message 
    });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching books', 
      error: error.message 
    });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ 
      message: 'Book updated successfully', 
      book: updatedBook 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error updating book', 
      error: error.message 
    });
  }
};