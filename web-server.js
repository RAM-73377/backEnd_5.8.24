const express = require('express');
const bodyParser = require("body-parser");
const userService = require('./user-service');
const path = require('path');
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend/src')));


app.get("/", (req, res) => {
  res.sendFile(path.join('E:\\ps2\\frontend\\src','CreateAccountForm.js'));
});


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


app.listen(4001, () => {
  console.log('Web Server listening on port 4001');
});
