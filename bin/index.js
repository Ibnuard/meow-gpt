const { Meow } = require("../meow");
const gptFunc = require("./gpt");
const chatGPT = require("./gpt2");
const { modeSelector } = require("./utils");

//MESSAGE HANDLER
const Handler = async (client, message) => {
  //define message handler
  const cat = await Meow(message, client);

  //send message
  async function sendMessage(content, options, receiver) {
    return await client.sendMessage(receiver ?? message.from, content, options);
  }

  //reply message
  async function replyMessage(content, options, receiver) {
    return await message.reply(content, options);
  }

  // Handle on received personal message
  if (!cat.isGroup) {
    console.log("bot called with message " + message.body);
    await message.react("😼");
    try {
      console.log("ChatDemo AI");
      await gptFunc(client.pupBrowser, message.body, async (res) => {
        replyMessage(res == "ERROR" ? "Meow coba lagi ya😿" : res);

        if (res == "ERROR") {
          await message.react("😿");
        } else {
          await message.react("😻");
        }
      });
    } catch (error) {
      replyMessage("Meow coba lagi ya😿");
      await message.react("😿");
    }
  }

  // Handle on bot mentioned on grup
  if (cat.isBotMentioned) {
    console.log("bot mentioned with message " + message.body);
    await message.react("😼");
    const prompt = message.body.split(" ").slice(1).join(" ");
    if (prompt.length > 0) {
      try {
        console.log("ChatDemo AI");
        await gptFunc(client.pupBrowser, message.body, async (res) => {
          replyMessage(res == "ERROR" ? "Meow coba lagi ya😿" : res);

          if (res == "ERROR") {
            await message.react("😿");
          } else {
            await message.react("😻");
          }
        });
      } catch (error) {
        replyMessage("Meow coba lagi ya😿");
        await message.react("😿");
      }
    } else {
      await message.react("😾");
      replyMessage("Manggil doang nanya kaga😾");
    }
  }
};

exports.Handler = Handler;
