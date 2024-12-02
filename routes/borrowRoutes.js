const express = require('express');
const router = express.Router();
const { borrowBook, returnBook } = require('../controllers/borrowController');
const { authenticateJWT } = require('../controllers/authController');

router.post('/borrow', authenticateJWT, borrowBook);
router.post('/return', authenticateJWT, returnBook);

module.exports = router;