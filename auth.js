require('dotenv').config();
const { MongoClient } = require('mongodb');
const uri = process.env.DATABASE_URL;
// connect to database
async function connectToDatabase() {
    const client = new MongoClient(uri);
    try {
      await client.connect();
      console.log('Connected to database!');
      return client;
    } catch (err) {
      console.log(err);
    }
  }

// function for check user in database

// function for add user in database
async function addUserToDatabase(chatId, orgId, apiKey) {
    const client = await connectToDatabase();
    const db = client.db('usersDB');
    const collection = db.collection('users');
    const user = { chatId, orgId, apiKey };
    await collection.insertOne(user);
    console.log(`User with chat ID ${chatId} added to database!`);
    client.close();
  }
// function for update user messages array

// function for getting user messages array

// function for delete user messages array


module.exports ={
    addUserToDatabase
}