// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const { 
  createBook, 
  getAllBooks, 
  updateBook 
} = require('../controllers/bookController');
const { 
  authenticateJWT, 
  requireAdmin 
} = require('../controllers/authController');

router.post('/', authenticateJWT, requireAdmin, createBook);
router.get('/', authenticateJWT, getAllBooks);
router.put('/:id', authenticateJWT, requireAdmin, updateBook);

module.exports = router;