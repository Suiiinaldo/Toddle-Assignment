const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  SALT_ROUNDS: process.env.SALT_ROUNDS,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
  AWS_ACCESS_ID: process.env.AWS_ACCESS_ID,
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
  BUCKET_NAME: process.env.BUCKET_NAME,
};
