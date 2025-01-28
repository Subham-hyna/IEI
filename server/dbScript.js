const { spawn } = require("child_process");
require("dotenv").config({ path: "config/config.env" });
console.log(process.env.MONGOSH_URI);

const mongoshProcess = spawn(
  "mongosh",
  [
    process.env.MONGOSH_URI,
    "--apiVersion",
    "1",
    "--username",
    process.env.MONGOSH_USERNAME,
  ],
  { stdio: "inherit" }
);

mongoshProcess.on("close", (code) => {
  console.log(`Mongosh process exited with code ${code}`);
});
