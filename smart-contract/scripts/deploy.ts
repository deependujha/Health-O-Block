import { ethers } from "hardhat";

async function main() {

  const HealthOBlock = await ethers.getContractFactory('HealthOBlock');
  const healthOBlock = await HealthOBlock.deploy();

  await healthOBlock.deployed();

  console.log(`HealthOBlock smart-contract deployed to ${healthOBlock.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
