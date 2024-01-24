const fs = require("fs");
const path = require("path");
const { task } = require("hardhat/config");

task("deploy", "deploy all contracts").setAction(deploy);

/**
 *
 * @param {{}} args
 * @param {import('hardhat/types').HardhatRuntimeEnvironment} hre
 */
async function deploy(args, hre) {
  console.log(`Deploying to ${hre.network.name}...`);

  // Force compilation
  await hre.run("compile");

  // We are using first account as deployer
  const [deployer] = await hre.ethers.getSigners();

  const contractsToDeploy = ["ExampleContract"];

  for (const contractName of contractsToDeploy) {
    console.log(`Deploying ${contractName}...`);

    // Init contract factory
    const contractFactory = await hre.ethers.getContractFactory(
      contractName,
      deployer
    );

    // Deploy contract
    const contract = await contractFactory.deploy(123);
    await contract.waitForDeployment();

    // Get and log contract address
    const contractAddress = await contract.getAddress();
    console.log(`${contractName} deployed to: ${contractAddress}`);

    // Save deployemnt info
    await saveDeploy(
      contractName,
      contractAddress,
      hre.artifacts.readArtifactSync(contractName).abi
    );
  }

  console.log("Deployed successfully. Godspeed.");
}

/**
 *
 * @param {string} contractName
 * @param {string} contractAddress
 * @param {any[]} contractAbi
 */
async function saveDeploy(contractName, contractAddress, contractAbi) {
  // Create network deployment folder if it doesn't exist
  fs.mkdirSync(path.join("deployments", hre.network.name), { recursive: true });

  // Save deployed contract address and abi in a json file
  fs.writeFileSync(
    path.join("deployments", hre.network.name, `${contractName}.json`),
    JSON.stringify(
      {
        address: contractAddress,
        abi: contractAbi,
      },
      null,
      4
    )
  );

  // Save deployed contract abi in a file for frontend to use with typechain
  fs.writeFileSync(
    path.join("deployments", hre.network.name, `${contractName}.abi`),
    JSON.stringify(contractAbi, null, 4)
  );
}

exports.deploy = deploy; // exported for test fixture
