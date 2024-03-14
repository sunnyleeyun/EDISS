const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Database connection
const db = mysql.createConnection({
  host: 'a1-dbclusteraurorabookstore-w2wrko3ebezu.cluster-ct0y488k4n3t.us-east-1.rds.amazonaws.com',
  user: 'root',
  password: 'Root1234Root',
  database: 'BookStore'
});

// Connect to the database
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});


// Retrieve Customer by ID endpoint
router.get('/:id', (req, res) => {
  const customerIdStr = req.params.id; // Get the customer ID from the request params
  
  // Check if customerId contains any non-numeric characters
  if (!/^\d+$/.test(customerIdStr)) {
    return res.status(400).json({ message: 'Illegal, missing, or malformed input' });
  }

  const customerId = parseInt(req.params.id); // Parse to integer
  
  const selectQuery = 'SELECT * FROM Customer WHERE id = ?';
  db.query(selectQuery, [customerId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'ID does not exist in the system' });
    }
    return res.status(200).json(result[0]);
  });
});

// Add Customer endpoint
router.post('/', (req, res) => {
  const { userId, name, phone, address, address2, city, state, zipcode } = req.body;

  // Validate request body
  if (!userId || !name || !phone || !address || !city || !state || !zipcode) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Validate userId format
  if (!isValidEmail(userId)) {
    return res.status(400).json({ message: 'Invalid email format for userId' });
  }

  // Validate state abbreviation
  if (!isValidState(state)) {
    return res.status(400).json({ message: 'Invalid state abbreviation' });
  }

  // Check if userId already exists
  const selectQuery = 'SELECT * FROM Customer WHERE userId = ?';
  db.query(selectQuery, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (result.length > 0) {
      return res.status(422).json({ message: 'This user ID already exists in the system.' });
    }
    
    // Insert new customer
    const insertQuery = 'INSERT INTO Customer (userId, name, phone, address, address2, city, state, zipcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(insertQuery, [userId, name, phone, address, address2, city, state, zipcode], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Internal server error' });
      }
      const newCustomerId = result.insertId;
      const location = `${req.baseUrl}/customers/${newCustomerId}`;
      res.setHeader('Location', location);
      return res.status(201).json({
        id: newCustomerId,
        userId,
        name,
        phone,
        address,
        address2,
        city,
        state,
        zipcode
      });
    });
  });
});

// Function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to validate state abbreviation
function isValidState(state) {
  // List of valid US state abbreviations
  const validStates = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
    'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA',
    'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];
  return validStates.includes(state.toUpperCase());
}


// Retrieve Customer by user ID endpoint
router.get('/', (req, res) => {
  const userId = req.query.userId; // Get the user ID (email address) from the query parameters
  
  // Check if userId is missing or malformed
  if (!userId || !isValidEmail(userId)) {
    return res.status(400).json({ message: 'Illegal, missing, or malformed input' });
  }

  const selectQuery = 'SELECT * FROM Customer WHERE userId = ?';
  db.query(selectQuery, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'User-ID does not exist in the system' });
    }
    return res.status(200).json(result[0]);
  });
});


module.exports = router;
