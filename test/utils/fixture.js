const fs = require("fs");
const path = require("path");
const hre = require("hardhat");
const { ethers } = hre;
const { deploy } = require("../../tasks/deploy");

const deployFixture = async () => {
  await deploy({}, hre);

  const basePath = path.join(
    __dirname,
    "..",
    "..",
    "deployments",
    hre.network.name
  );

  const contractNames = ["ExampleContract"];

  const deployedContracts = {};

  for (const contractName of contractNames) {
    if (!fs.existsSync(path.join(basePath, `${contractName}.json`))) {
      console.log(`Skipping ${contractName}. Missing deployment file.`);
      continue;
    }
    const contractAddress = JSON.parse(
      fs.readFileSync(path.join(basePath, `${contractName}.json`), "utf8")
    ).address;

    const contract = await ethers.getContractAt(contractName, contractAddress);

    deployedContracts[contractName] = contract;
  }

  return deployedContracts;
};

module.exports.deployFixture = deployFixture;
