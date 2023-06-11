const { Meow } = require("../meow");
const gptFunc = require("./gpt");

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
    await message.react("😼");
    await gptFunc(client.pupBrowser, message.body, async (res) => {
      replyMessage(res == "ERROR" ? "Meow coba lagi ya😿" : res);

      if (res == "ERROR") {
        await message.react("😿");
      } else {
        await message.react("😽");
      }
    });
  }

  // Handle on bot mentioned on grup
  if (cat.isBotMentioned) {
    await message.react("😼");
    const prompt = message.body.split(" ").slice(1).join(" ");
    if (prompt.length > 0) {
      await gptFunc(client.pupBrowser, prompt, async (res) => {
        replyMessage(res == "ERROR" ? "Meow coba lagi ya😿" : res);

        if (res == "ERROR") {
          await message.react("😿");
        } else {
          await message.react("😽");
        }
      });
    } else {
      await message.react("😾");
      replyMessage("Manggil doang nanya kaga😾");
    }
  }
};

exports.Handler = Handler;
