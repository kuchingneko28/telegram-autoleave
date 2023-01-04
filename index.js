const getSession = require("./session");
const leave = require("./leave");
const fs = require("fs");

// Go to https://my.telegram.org/apps, sign in, go to API development tools, create an app, copy and paste below:
const apiId = "";
const apiHash = "";

if (!fs.existsSync("./session.txt")) {
  getSession(apiId, apiHash);
} else {
  leave(apiId, apiHash);
}
