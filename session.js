const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const fs = require("fs");
const input = require("input"); // npm i input

module.exports = async (apiId, apiHash) => {
  const stringSession = new StringSession(""); // fill this later with the value from session.save()
  console.log("Loading interactive...");
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  await client.start({
    phoneNumber: async () => await input.text("Please enter your number: "),
    password: async () => await input.text("Please enter your password: "),
    phoneCode: async () => await input.text("Please enter the code you received: "),
    onError: (err) => console.log(err),
  });

  fs.writeFile("session.txt", client.session.save(), (err) => {
    if (err) console.log(err);
    else {
      console.log("Session written successfully\n");
    }
  });
  client.disconnect();
};
