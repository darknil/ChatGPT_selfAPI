require('dotenv').config();
const { addUserToDatabase } = require('./auth');

////////// Telegram variables
const TelegramBot = require('node-telegram-bot-api');
const token =process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token,{polling:{
    interval:300,
    params:{
        timeout:10
    }
}});
////////// Telegram variables
const { MongoClient } = require('mongodb');
const uri = process.env.DATABASE_URL;
function loginfo(){
    console.log('\n\n////////// START LOG INFO ////////////////');
    console.log(arguments);
    console.log('////////// END LOG INFO /////////////////');
}
bot.onText(/\/register/, (msg) => {
    const chatId = msg.chat.id;
    const message = 'Please enter your Organization ID:';
    bot.sendMessage(chatId, message);
    bot.once('message', (orgIdMsg) => {
      const orgId = orgIdMsg.text;
      const message = 'Please enter your API_KEY:';
      bot.sendMessage(chatId, message);
      bot.once('message', async (apiKeyMsg) => {
        const apiKey = apiKeyMsg.text;
        await addUserToDatabase(chatId, orgId, apiKey);
        const message = 'You have been registered successfully!';
        bot.sendMessage(chatId, message);
        loginfo(msg.chat.id,msg.chat.first_name,msg.chat.username);
      });
    });
  });
