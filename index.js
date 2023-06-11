const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { Log } = require("./bin/styles");
const { Handler } = require("./bin");

const WAConnect = async () => {
  const BOT = new Client({
    qrMaxRetries: 1,
    authTimeoutMs: 0,
    authStrategy: new LocalAuth({
      dataPath: "./.meow",
    }),
    puppeteer: {
      executablePath:
        "/usr/bin/google-chrome-stable" /*"/usr/bin/google-chrome-stable"*/,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--aggressive-cache-discard",
        "--disable-cache",
        "--disable-application-cache",
        "--disable-offline-load-stale-cache",
        "--disk-cache-size=0",
      ],
    },
  });

  //IF QR READY
  BOT.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });

  //IF CLIENT READY
  BOT.on("ready", () => {
    console.log(Log.logSuccess("Meoww!"));
  });

  BOT.on("message", async (msg) => {
    await Handler(BOT, msg);
  });

  //START CLIENT
  BOT.initialize();

  BOT.on("disconnected", async (message) => {
    console.log(Log.logWarning("Disconnected : " + message));

    //destroy
    await BOT.destroy();

    //retry to connect
    WAConnect();
  });
};

WAConnect();
