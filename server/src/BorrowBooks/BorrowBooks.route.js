const express = require('express');
const router = express.Router();

const controllerBorrowBooks = require('./BorrowBooks.controller');

router.post('/api/borrowbooks', controllerBorrowBooks.BorrowBooksUser);
router.get('/api/getborrowbooks', controllerBorrowBooks.getAllBorrowBooks);

module.exports = router;
