const cron = require("node-cron");
let createCron = () => {
  console.log("definig cron");
  cron.schedule("* * * * * *", function () {
    console.log("running a task every minute");
  });
};
const crons = { createCron };
module.exports = crons;
