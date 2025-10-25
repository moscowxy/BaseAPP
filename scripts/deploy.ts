import { ethers } from "hardhat";

async function main() {
  const Fethet = await ethers.getContractFactory("Fethet");
  const fethet = await Fethet.deploy();
  const deploymentTx = fethet.deploymentTransaction();
  await fethet.waitForDeployment();

  const address = await fethet.getAddress();
  console.log(`Fethet deployed to: ${address}`);
  if (deploymentTx) {
    console.log(`Deployment transaction hash: ${deploymentTx.hash}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
