const express = require('express');
const router = express.Router();
const db = require('../db');

// Retrieve all books endpoint
router.get('/', (req, res) => {
    const selectQuery = 'SELECT * FROM Book';
    db.query(selectQuery, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Internal server error' });
      }
      return res.status(200).json(result);
    });
  });
  

// Add Book endpoint
router.post('/', (req, res) => {
  const { ISBN, title, Author, description, genre, price, quantity } = req.body;

  // Validate request body
  if (!ISBN || !title || !Author || !description || !genre || !price || !quantity) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const insertQuery = 'INSERT INTO Book (ISBN, title, Author, description, genre, price, quantity) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(insertQuery, [ISBN, title, Author, description, genre, price, quantity], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(422).json({ message: 'This ISBN already exists in the system.' });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
    const location = `${req.baseUrl}/books/${ISBN}`;
    res.setHeader('Location', location);
    return res.status(201).json(req.body);
  });
});

// Update Book endpoint
router.put('/:ISBN', (req, res) => {
  const ISBN = req.params.ISBN;
  const { title, Author, description, genre, price, quantity } = req.body;

  // Validate request body
  if (!title || !Author || !description || !genre || !price || !quantity) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const updateQuery = 'UPDATE Book SET title = ?, Author = ?, description = ?, genre = ?, price = ?, quantity = ? WHERE ISBN = ?';
  db.query(updateQuery, [title, Author, description, genre, price, quantity, ISBN], (err, result) => {
    if (err) {
      if (err.code === 'ER_BAD_FIELD_ERROR' || err.code === 'ER_NO_SUCH_TABLE') {
        return res.status(404).json({ message: 'ISBN not found' });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
    return res.status(200).json(req.body);
  });
});



// Retrieve Book endpoint
router.get('/isbn/:ISBN', (req, res) => {
  const ISBN = req.params.ISBN;

  const selectQuery = 'SELECT * FROM Book WHERE ISBN = ?';
  db.query(selectQuery, [ISBN], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'ISBN not found' });
    }
    return res.status(200).json(result[0]);
  });
});


// Alias endpoint for Retrieve Book endpoint
router.get('/:ISBN', (req, res) => {
  const ISBN = req.params.ISBN;

  const selectQuery = 'SELECT * FROM Book WHERE ISBN = ?';
  db.query(selectQuery, [ISBN], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'ISBN not found' });
    }
    return res.status(200).json(result[0]);
  });
});


module.exports = router;
