const express = require('express');
const { getApp } = require('../config/app');
const app = getApp();
const config = require('../config/config.json');
const db = require('../config/db-connection');
const userService = require('./user-service');

app.use(express.json()); // Add this line to parse request body as JSON

app.post('/create-account', async (req, res) => {
  try {
    const userData = req.body;
    const result = await userService.createUser(userData);
    res.status(201).json(result);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Error creating account' });
  }
});

app.put('/update-account/:id', async (req, res) => {
  const userId = req.params.id;
  const updateData = req.body;
  try {
    const result = await userService.updateUser(userId, updateData);
    res.status(200).json({ message: 'Account updated successfully', result });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Error updating account' });
  }
});

app.delete('/delete-account/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await userService.deleteUser(userId);
    res.status(200).json({ message: 'Account deleted successfully', result });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Error deleting account' });
  }
});

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;
