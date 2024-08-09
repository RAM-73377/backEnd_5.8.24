const express = require('express');
const bodyParser = require("body-parser");
const userSerivce = require('./user-service');
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
    const result = await userSerivce.createUser(userData);
    res.status(201).json(result);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Error creating account' });
  }
});

app.listen(4001, () => {
  console.log('Web Server listening on port 4001');
});
