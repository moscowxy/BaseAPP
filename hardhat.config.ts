import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const { BASE_RPC_URL, WALLET_PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    "base-sepolia": {
      url: BASE_RPC_URL || "https://sepolia.base.org",
      accounts: WALLET_PRIVATE_KEY ? [WALLET_PRIVATE_KEY] : [],
      gas: "auto",
      gasPrice: "auto"
    }
  },
  defaultNetwork: "hardhat"
};

export default config;
