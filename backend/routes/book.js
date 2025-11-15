const express = require('express');
const Book = require('../models/Book');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// Get all books
router.get('/', auth, async (req, res) => {
  try {
    const books = await Book.find().populate('addedBy', 'name email');
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add new book (Admin only)
router.post('/', auth, admin, async (req, res) => {
  try {
    const { title, author, isbn, publishedYear, genre, description } = req.body;

    // Check if book already exists
    const existingBook = await Book.findOne({ isbn });
    if (existingBook) {
      return res.status(400).json({ message: 'Book with this ISBN already exists' });
    }

    const book = new Book({
      title,
      author,
      isbn,
      publishedYear,
      genre,
      description,
      addedBy: req.user._id
    });

    await book.save();
    await book.populate('addedBy', 'name email');

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;