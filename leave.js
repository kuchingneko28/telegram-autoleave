const { TelegramClient, Api } = require("telegram");
const { StringSession } = require("telegram/sessions");
const fs = require("fs");

module.exports = async (apiId, apiHash) => {
  fs.readFile("session.txt", "utf8", async function (err, data) {
    const session = new StringSession(data); // You should put your string session here
    const client = new TelegramClient(session, apiId, apiHash, {});

    await client.connect(); // This assumes you have already authenticated with .start()

    const dialogs = await client.getDialogs();
    for (let dialog of dialogs) {
      try {
        if (dialog.isGroup || dialog.isChannel) {
          const result = await client.invoke(
            new Api.channels.LeaveChannel({
              channel: dialog.entity.username,
            })
          );
          console.log(`Leave ${dialog.entity.title}`);
          console.log(dialog.entity.username);
        }
      } catch (err) {
        console.log("Something is not right!");
      }
    }
    client.disconnect();
  });
};
