# BaseAPP

This repository contains a Hardhat project configured for deploying the `Fethet` contract to the Base Sepolia test network.

## Setup

1. Install dependencies (requires access to npm registry):

   ```bash
   pnpm install
   ```

   > **Note:** In restricted environments you may need to configure an npm proxy or mirror to allow access to the npm registry.

2. Copy `.env` and provide your own values:

   ```bash
   cp .env .env.local
   # edit .env.local and set WALLET_PRIVATE_KEY
   ```

## Commands

- Compile contracts:

  ```bash
  pnpm compile
  ```

- Run tests:

  ```bash
  pnpm test
  ```

- Deploy to Base Sepolia:

  ```bash
  pnpm deploy:base-sepolia
  ```

  The deployment script prints the transaction hash via Hardhat's deployment receipt once the transaction is mined.
