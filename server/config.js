const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load env vars if env is not production
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: './server/config/local.env' });
}

module.exports = {
  PORT: process.env.PORT || 7777,
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_URI: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV,
  INITIAL_CHIPS_AMOUNT: 100000,
  RPC_URL: process.env.RPC_URL ?? 'https://polygon-mumbai-bor.publicnode.com',
  CONTRACT_DEPLOYMENTS_PATH: path.join(
    __dirname,
    '..',
    'deployments',
    process.env.CHAIN_NAME ?? 'mumbai'
  ),
};
