import { expect } from "chai";
import { ethers } from "hardhat";

describe("Fethet", function () {
  it("stores and retrieves values", async function () {
    const Fethet = await ethers.getContractFactory("Fethet");
    const fethet = await Fethet.deploy();
    await fethet.waitForDeployment();

    const [, user] = await ethers.getSigners();
    const tx = await fethet.connect(user).store(42);
    await tx.wait();

    expect(await fethet.retrieve()).to.equal(42n);
  });
});
