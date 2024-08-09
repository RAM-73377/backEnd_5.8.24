const mysql = require('mysql2');
const config = require('./config.json');

const db = mysql.createConnection(config.database);

db.connect((err) => {
  if (err) {
    console.log("error db")
    return;
  }
  console.log("connected")
});

const createUser = async (userData) => {
  const checkQuery = 'SELECT COUNT(*) AS count FROM users WHERE email = ? OR contactNumber = ?';
  const insertQuery = 'INSERT INTO users (firstName, lastName, email, password, contactNumber, domain) VALUES (?, ?, ?, ?, ?, ?)';

  try {
    const results = await db.promise().query(checkQuery, [userData.email, userData.contactNumber]);
    const { count } = results[0][0];
    if (count > 0) {
      throw new Error('Email or contact number already exists');
    }
    await db.promise().query(insertQuery, [userData.firstName, userData.lastName, userData.email, userData.password, userData.contactNumber, userData.domain]);
    return { message: 'Account created successfully' };
  } catch (err) {
    console.error('Error creating user:', err);
    throw new Error('Error creating account');
  }
};

module.exports = { createUser };
