require('dotenv').config();
const { MongoClient } = require('mongodb');
const uri = process.env.DATABASE_URL;
// connect to database
async function connectToDatabase() {
    const client = new MongoClient(uri);
    try {
      await client.connect();
      return client;

    } catch (err) {
      console.log(err);
    }
  }

// function for check user in database
async function checkUserInDatabase(userId){
  const client = await connectToDatabase();
  try {
    const db = client.db('usersDB');
    const collection = db.collection('users');

    const query = { chatId: userId };
    
    const result = await collection.findOne(query);
      if(result){
        return true;
      }else{
        return false;
      }

  } catch (error) {
    console.error(err);
  }finally{
    client.close();
  }

}
// function for add user in database
async function addUserToDatabase(chatId, orgId, apiKey) {
  const client = await connectToDatabase();
  try {
    const indb = await checkUserInDatabase(chatId);
    if(!indb){
      const db = client.db('usersDB');
      const collection = db.collection('users');
      
      const user = { chatId, orgId, apiKey, messages:[] };
      await collection.insertOne(user);
  
      console.log(`User with chat ID ${chatId} added to database!`);
    }else{
      return console.log('user with that id exist in db');
    }


  } catch (error) {
    console.error(err);
  }finally{
    client.close();
  }

    
  }
// function for add orgid for user
async function addOrgIdToUser(chatId, orgId) {
  const client = await connectToDatabase();
  try {
    const db = client.db('usersDB');
    const collection = db.collection('users');
  
    const filter = { chatId: chatId };
    const update = { $set: { orgId: orgId } };
  
    const result = await collection.updateOne(filter, update);
  
    console.log(`${result.matchedCount} document(s) matched the filter criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
  
  } catch (error) {
    console.error(err);
  }finally{
    client.close();
  }
}
// function for add apikey for user
async function addApiKeyToUser(chatId,apiKey){
  const client = await connectToDatabase();
  try {
    const db = client.db('usersDB');
    const collection = db.collection('users');

    const filter = { chatId: chatId };
    const update = { $set: { apiKey: apiKey } };

    const result = await collection.updateOne(filter, update);
    
    console.log(`${result.matchedCount} document(s) matched the filter criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);

  } catch (error) {
    console.error(err);
  }finally{
    client.close();
  }
}

// function for get user field value
async function getUserField(chatId, field){
  // field can be 'chatId', 'orgId', 'apiKey'
  const client = await connectToDatabase();
  try {
    const db = client.db('usersDB');
    const collection = db.collection('users');

    const filter = { chatId: chatId };
    const options = { projection: { [field]: 1, _id: 0 } };

    const result = await collection.findOne(filter, options);

    return result ? result[field] : null;

  } catch (error) {
    console.error(err);
  }finally{
    client.close();
  }
}
// function for update user messages array

// function for getting user messages array

// function for delete user messages array


module.exports ={
    addUserToDatabase,
    checkUserInDatabase,
    addOrgIdToUser,
    addApiKeyToUser,
    getUserField
}