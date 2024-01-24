const {
  loadFixture,
} = require('@nomicfoundation/hardhat-toolbox/network-helpers');
const { deployFixture } = require('./utils/fixture');
const { expect } = require('chai');
const hre = require('hardhat');
const { ethers } = hre;

describe('ExampleContract', () => {
  let deployedContracts;
  let exampleContract;
  let deployer;
  let user1;

  beforeEach(async () => {
    deployedContracts = await loadFixture(deployFixture);
    exampleContract = deployedContracts.ExampleContract;

    [deployer, user1] = await ethers.getSigners();
  });

  it('public var has been set', async () => {
    const publicVar = await exampleContract.examplePublicVar();
    expect(publicVar).to.be.eq(123);
  });

  it('owner has been set', async () => {
    const owner = await exampleContract.owner();

    expect(owner).to.be.eq(await deployer.getAddress());
  });

  describe('getExamplePublicVar', () => {
    it('sucessfully get public variable through getter function', async () => {
      const publicVar = await exampleContract.getExamplePublicVar();
      expect(publicVar).to.be.eq(123);
    });
  });

  describe('setExamplePublicVar', () => {
    it('reverts when NOT called by owner', async () => {
      await expect(
        exampleContract.connect(user1).setExamplePublicVar(456)
      ).to.be.revertedWith('Only the owner can call this function');
    });

    it('successfully sets new public var', async () => {
      await exampleContract.setExamplePublicVar(456);

      expect(await exampleContract.getExamplePublicVar()).to.be.eq(456);
    });
  });
});
