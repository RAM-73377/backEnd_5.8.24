const db = require('../config/db-connection');
const { getApp } = require('../config/app');
const app = getApp();
const config = require('../config/config.json');

const createUser = async (userData) => {
  const checkQuery = 'SELECT COUNT(*) AS count FROM users WHERE email = ? OR contactNumber = ?';
  const insertQuery = 'INSERT INTO users (firstName, lastName, email, password, contactNumber, domain) VALUES (?, ?, ?, ?, ?, ?)';

  try {
    const results = await db.promise().query(checkQuery, [userData.email, userData.contactNumber]);

    if (results[0] && results[0][0]) {
      const { count } = results[0][0];

      if (count > 0) {
        throw new Error('Email or contact number already exists');
      }
    } else {
      throw new Error('Error retrieving user data');
    }

    await db.promise().query(insertQuery, [userData.firstName, userData.lastName, userData.email, userData.password, userData.contactNumber, userData.domain]);

    return { message: 'Account created successfully' };
  } catch (err) {
    console.error('Error creating user:', err);
    throw new Error('Error creating account');
  }
};

const updateUser = async (id, updateData) => {
  const updateQuery = 'UPDATE users SET firstName = ?, lastName = ?, email = ?, password = ?, contactNumber = ?, domain = ? WHERE id = ?';

  try {
    await db.promise().query(updateQuery, [updateData.firstName, updateData.lastName, updateData.email, updateData.password, updateData.contactNumber, updateData.domain, parseInt(id)]);

    return { message: 'Account updated successfully' };
  } catch (err) {
    console.error('Error updating user:', err);
    throw new Error('Error updating account');
  }
};

const deleteUser = async (id) => {
  const deleteQuery = 'DELETE FROM users WHERE id = ?';

  try {
    await db.promise().query(deleteQuery, [id]);

    return { message: 'Account deleted successfully' };
  } catch (err) {
    console.error('Error deleting user:', err);
    throw new Error('Error deleting account');
  }
};

module.exports = { createUser, updateUser, deleteUser };
