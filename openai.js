const { Configuration, OpenAIApi } = require("openai");
async function openaiChat(ORG_ID,API_KEY,usermessages){
    const configuration = new Configuration({
        organization:ORG_ID,
        apiKey: API_KEY,
      });
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: usermessages,
        max_tokens: 1000,
      });
}
/// добавить запрос к апи 
