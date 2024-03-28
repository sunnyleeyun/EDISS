const express = require('express');
const router = express.Router();
const axios = require('axios');

// Retrieve all books endpoint
router.get('/', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3000/books');
        return res.status(200).json(response.data);
    } catch (error) {
        console.error('Error retrieving books:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Add Book endpoint
router.post('/', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:3000/books', req.body);
        return res.status(201).json(response.data);
    } catch (error) {
        console.error('Error adding book:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Update Book endpoint
router.put('/:ISBN', async (req, res) => {
    const ISBN = req.params.ISBN;
    try {
        const response = await axios.put(`http://localhost:3000/books/${ISBN}`, req.body);
        return res.status(200).json(response.data);
    } catch (error) {
        console.error('Error updating book:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Retrieve Book by ISBN endpoint
router.get('/isbn/:ISBN', async (req, res) => {
    const ISBN = req.params.ISBN;
    try {
        const response = await axios.get(`http://localhost:3000/books/isbn/${ISBN}`);
        return res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error retrieving book by ISBN:', error);
        if (error.response) {
            return res.status(error.response.status).json(error.response.data);
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
