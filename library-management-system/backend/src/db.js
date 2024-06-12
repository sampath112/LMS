const { connect } = require("mongoose");

const connectDb = async () => {
  const mongoUri = "mongodb://0.0.0.0:27017/my-database"; // Replace "my-database" with the name of your database

  return connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
};

module.exports = { connectDb };
