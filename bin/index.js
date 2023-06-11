const { Meow } = require("../meow");
const gptFunc = require("./gpt");
const { Words } = require("./misc");

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

  if (cat.isValidMessage) {
    await message.react("😼");
    if (cat.value.length > 0) {
      await gptFunc(client.pupBrowser, cat.value, async (res) => {
        replyMessage(
          res == "ERROR" ? "Yah cape deh maaf ya mohon coba lagi!" : res
        );

        if (res == "ERROR") {
          await message.react("😿");
        } else {
          await message.react("😽");
        }
      });
    } else {
      await message.react("😾");
      replyMessage("Kasih pertanyaan yang bener yaa maniezzz!!");
    }
  } else {
    if (cat.isBotMentioned) {
      await message.react("😼");
      const prompt = message.body
        .split(" ")
        .slice(1, message.body.length)
        .join(" ");
      if (prompt.length > 0) {
        await gptFunc(client.pupBrowser, prompt, async (res) => {
          replyMessage(
            res == "ERROR" ? "Yah cape deh maaf ya mohon coba lagi!" : res
          );

          if (res == "ERROR") {
            await message.react("😿");
          } else {
            await message.react("😽");
          }
        });
      } else {
        await message.react("😾");
        replyMessage("Kasih pertanyaan yang bener yaa maniezzz!!");
      }
    }
  }
};

exports.Handler = Handler;
