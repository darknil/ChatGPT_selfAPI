require('dotenv').config()
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
function loginfo(){
    console.log('\n\n////////// START LOG INFO ////////////////');
    console.log(arguments);
    console.log('////////// END LOG INFO /////////////////');
}

bot.on("message",async (msg)=>{
    const chatid = msg.chat.id;
    const chatmessage = msg.text;
    const newmessage ="you send " + chatmessage;
    bot.sendMessage(chatid,newmessage);
    loginfo(chatid,chatmessage,msg.chat.first_name,msg.chat.last_name,msg.chat.username);
});