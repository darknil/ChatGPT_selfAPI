require('dotenv').config();
const { addUserToDatabase } = require('./auth');
const { checkUserInDatabase } = require('./auth');
const { addOrgIdToUser } = require('./auth');
const { addApiKeyToUser } = require('./auth');
const { getUserField } = require('./auth');
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
/// Добавить регистрацию
/// Добавить обработку сообщений
bot.setMyCommands([
    {command: '/start', description: 'start'},
    {command: '/register', description: 'register'},
    {command: '/donate', description: 'donate'},
]);

bot.onText(/\/start/,async (msg)=>{
    const chatId = msg.chat.id;
    const messageforuser = process.env.START_TEXT;
    bot.sendMessage(chatId,messageforuser);
    await addUserToDatabase(chatId);
});
bot.onText(/\/donate/,async (msg)=>{
    const chatId = msg.chat.id;
    bot.sendMessage(chatId,DONATE_TEXT );
});
bot.onText(/\/register/,async (msg)=>{
  const chatId = msg.chat.id;
  const messageforuser = process.env.NOT_FOUND;
  bot.sendMessage(chatId,messageforuser, {parse_mode: "Markdown"});
});
bot.onText(/\/orgid (.+)/,async (msg,match)=>{
    const chatId = msg.chat.id;
    const orgId = match[1];

    await addOrgIdToUser(chatId,orgId);

    const userOrgId = await getUserField(chatId,'orgId');
    const userApikey = await getUserField(chatId,'apiKey');
    const answer ='your orgId and Apikey:\n' + userOrgId + '\n' + userApikey;
    
    bot.sendMessage(chatId,answer);
});
bot.onText(/\/apikey (.+)/,async (msg,match)=>{
    const chatId = msg.chat.id;
    const apiKey = match[1];

    await addApiKeyToUser(chatId,apiKey);

    const userOrgId = await getUserField(chatId,'orgId');
    const userApikey = await getUserField(chatId,'apiKey');
    const answer ='your orgId and Apikey:\n' + userOrgId + '\n' + userApikey;

    bot.sendMessage(chatId,answer)
});
//// /orgID "org_ID", /apikey "API_KEY"

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    
    // Проверяем, начинается ли сообщение с "/"
    if (text.startsWith('/')) {
      // Если да, игнорируем сообщение
      return;
    }
    const indb = await checkUserInDatabase(chatId);
    if(indb){
        bot.sendMessage(chatId,'one');
    }else{
        bot.sendMessage(chatId,"Your ID is not found in the database. Use /start");    
    }
    // Если нет, продолжаем обработку сообщения
    // ...
  });