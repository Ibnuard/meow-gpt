const { default: axios } = require("axios");
const moment = require("moment/moment");
const { v4 } = require("uuid");
const gptFunc = require("./gpt");

const chatGPT = async (message = "halo siapa kamu", reply, browser) => {
  try {
    const _URL = "https://chat.chatgptdemo.net/chat_api_stream";
    const timestamp = moment().valueOf();
    const uuid = v4();
    const headers = {
      "Content-Type": "application/json",
      accept: "text/event-stream",
      "Cache-Control": "no-cache",
      "Proxy-Connection": "keep-alive",
    };

    const body = {
      question: message,
      chat_id: uuid,
      timestamp: timestamp,
    };

    const res = await axios({
      method: "POST",
      url: _URL,
      headers: headers,
      data: body,
      responseType: "text",
    });

    const chunks = res.data.split(/\r?\n\r?\n/); // Menggunakan split untuk membagi data menjadi array string

    const result = {
      content: "",
    };

    chunks.forEach(async (chunk) => {
      const dataStr = chunk.replace("data: ", "");
      if (!dataStr) {
        return;
      }
      const data = JSON.parse(dataStr);
      if (!data?.choices) {
        try {
          await gptFunc(browser, message, (res) => reply(res));
        } catch (error) {
          reply("ERROR");
        }
        return;
      }
      const [
        {
          delta: { content = "" },
          finish_reason,
        },
      ] = data.choices;
      if (finish_reason === "stop") {
        return;
      }

      result.content += content;
    });

    reply(result.content);
  } catch (error) {
    try {
      await gptFunc(browser, message, (res) => reply(res));
    } catch (error) {
      reply("ERROR");
    }
  }
};

module.exports = chatGPT;
