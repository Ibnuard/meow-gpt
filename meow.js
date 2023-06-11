const Meow = async (message, client) => {
  const chat = await message.getChat();
  const msg = message.body;
  const author = message.from;
  const isGroup = chat.isGroup;
  const isBot =
    isGroup &&
    chat.participants.find(
      (chatObj) => chatObj.id.user === client.info.wid.user
    );
  const isBotAdmin = chat.isGroup && isBot.isAdmin;
  const mentions = await message.getMentions();

  const isBotMentioned = isGroup && mentions.find((chatObj) => chatObj.isMe);

  const args = msg.split(" ");
  const prefix = args[0].slice(0, 1);
  const command = args[0].replace(prefix, "");
  const value = args.slice(1);

  const isValidMessage = args[0] === "!meow";
  const isAdmin =
    isGroup &&
    chat.participants.find(
      (chatObj) => chatObj.id._serialized === message.author && chatObj.isAdmin
    );

  return {
    chat,
    msg,
    author,
    isGroup,
    isBotAdmin,
    command,
    value,
    isAdmin,
    isValidMessage,
    mentions,
    isBotMentioned,
  };
};

exports.Meow = Meow;
