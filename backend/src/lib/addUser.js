const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

dotenv.config();
// Connection URI
const uri = process.env.dbURI;
const dbName = 'daria-website';

// Function to hash password
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Function to add a user
async function addUser(username, password) {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db(dbName);

    // Hash password before inserting
    const hashedPassword = await hashPassword(password);

    // Insert user
    const result = await db.collection('users').insertOne({
      username,
      password: hashedPassword
    });
    console.log(`User added with ID: ${result.insertedId}`);
  } catch (err) {
    console.error('Error inserting user:', err);
  } finally {
    await client.close();
  }
}

// Prompt for user input
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Enter username: ', async (username) => {
  readline.question('Enter password: ', async (password) => {
    await addUser(username, password);
    readline.close();
  });
});