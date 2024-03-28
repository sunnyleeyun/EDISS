const express = require('express');
const axios = require('axios');

const router = express.Router();


// Add Customer endpoint
router.post('/', async (req, res) => {
    try {
      const response = await axios.post('http://localhost:3000/customers', req.body);
      const newCustomer = response.data;
      const location = `${req.baseUrl}/${newCustomer.id}`;
      res.setHeader('Location', location);
      return res.status(201).json(newCustomer);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        return res.status(422).json({ message: 'This user ID already exists in the system.' });
      }
      console.error('Error adding customer:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
});
  
// Retrieve Customer by ID endpoint
router.get('/:id', async (req, res) => {
    const customerId = req.params.id;
    try {
      const response = await axios.get(`http://localhost:3000/customers/${customerId}`);
      return res.status(response.status).json(response.data);
    } catch (error) {
      if (error.response) {
        return res.status(error.response.status).json(error.response.data);
      }
      console.error('Error fetching customer by ID:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
});
  
// Retrieve Customer by user ID endpoint
router.get('/', async (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ message: 'Missing userId query parameter' });
    }
    
    try {
      const response = await axios.get(`http://localhost:3000/customers?userId=${encodeURIComponent(userId)}`); // Corrected URL
      return res.status(response.status).json(response.data);
    } catch (error) {
      if (error.response) {
        return res.status(error.response.status).json(error.response.data);
      }
      console.error('Error fetching customer by user ID:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
