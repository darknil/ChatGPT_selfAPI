require('dotenv').config();
const { addUserToDatabase } = require('./auth');
const { checkUserInDatabase } = require('./auth');
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
//// Global vars
const DONATE_TEXT = "crypto eth for everyone 0x7F23e289A9a8120Ea1bB2cCC71d388a415B6E4A5 \n\n Qiwi for RUB - qiwi.com/p/79609614863 \n\n PrivatBank for UAH - 4731185610368521 \n\n for USD - 4731185610882851 \n\n nfor EUR - 4731185614196258"
//// Global vars
//// Добавить хеширование паролей
bot.setMyCommands([
    {command: '/start', description: 'start bot'},
    {command: '/donate', description: 'Support our project'},
    {command: '/register', description: 'Support our project'}
]);

bot.onText(/\/start/,(msg)=>{
    const chatId = msg.chat.id;
    const messageforuser = process.env.START_TEXT;
    bot.sendMessage(chatId,messageforuser);
});
bot.onText(/\/donate/,(msg)=>{
    const chatId = msg.chat.id;
    bot.sendMessage(chatId,DONATE_TEXT );
});
bot.onText(/\/register/,(msg)=>{
  const chatId = msg.chat.id;
  const messageforuser = process.env.NOT_FOUND;
  bot.sendMessage(chatId,messageforuser );
});
