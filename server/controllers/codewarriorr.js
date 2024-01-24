const ethers = require('ethers');
const fs = require('fs');
const path = require('path');
const config = require('../config');

// Load latest deployment of ExampleContract
const exampleContractDeployment = JSON.parse(
  fs.readFileSync(
    path.join(config.CONTRACT_DEPLOYMENTS_PATH, 'ExampleContract.json'),
    'utf8'
  )
);
// Init ethers provider and contract instance
const provider = new ethers.JsonRpcProvider(config.RPC_URL);
const exampleContract = new ethers.Contract(
  exampleContractDeployment.address,
  exampleContractDeployment.abi,
  provider
);

exports.codewarriorrApiTest = async (req, res) => {
  const examplePublicVar = await exampleContract.examplePublicVar();

  res.json({
    exampleContractPublicVar: examplePublicVar.toString(),
  });
};
