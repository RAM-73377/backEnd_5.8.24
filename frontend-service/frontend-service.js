const {getApp} = require('../config/app');
const app = getApp();
const path = require('path');
const config = require('../config/config.json');
const db = require('../config/db-connection');
app.use(express.static(path.join(__dirname, '../frontend/src')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/src', 'CreateAccountForm.js'));
});


