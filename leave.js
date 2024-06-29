const { TelegramClient, Api } = require("telegram");
const { StringSession } = require("telegram/sessions");
const fs = require("fs");

module.exports = async (apiId, apiHash, whitelist) => {
  fs.readFile("session.txt", "utf8", async function (err, data) {
    const session = new StringSession(data);
    const client = new TelegramClient(session, apiId, apiHash, {});

    await client.connect();

    const dialogs = await client.getDialogs();
    for (let dialog of dialogs) {
      const channel = dialog.isChannel;
      const group = dialog.isGroup;
      const username = dialog.entity.username;
      const channelName = dialog.entity.title;
      const id = dialog.id.value;

      try {
        if ((channel || group) && !whitelist.includes(username)) {
          await client.invoke(
            new Api.channels.LeaveChannel({
              channel: id,
            })
          );
          console.log(`Leave\n- Name: ${channelName}\n- Username: ${username}\n- ID: ${id}\n`);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    client.disconnect();
  });
};
