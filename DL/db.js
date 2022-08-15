const mongoose = require("mongoose");
exports.connect = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await mongoose.connect(
        process.env.MONGO_URL,
        { useNewUrlParser: true },
        (err) => {
          if (err) {
            throw err;
            reject();
          }
          console.log("DB connection success");
          resolve();
        }
      );
    } catch (e) {
      console.log("error mpngoose:", e);
    }
  });
};
