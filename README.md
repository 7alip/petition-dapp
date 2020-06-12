# Ethereum Petition App

This app configured for RSK testnet network. In order to test the application you can use Metamask or Nifty Wallet chrome extensions.

### 1. Configure Metamask to connect to RSK testnet

    * Open Networks tab and select Custom RPC
    * Fill the form as below and save:
        - Network Name: RSK Testnet
        - New RPC URL: https://public-node.testnet.rsk.co/2.0.1
        - ChainID: 31
        - Symbol: RBTC
        - Block Explorer URL: https://explorer.testnet.rsk.co
    * Copy your account address and get some free eth from [Faucet RSK](https://faucet.rsk.co/)

### 2. Configure Nifty Wallet to connect to RSK testnet

    * Open Networks tab and select RKS Testnet
    * Copy your account address and get some free eth from [Faucet RSK](https://faucet.rsk.co/)

### Start application

After you have configured crypto wallet extension you can start the application. Run the commands below:

Install dependencies: `npm i` or `yarn`
Start the application: `npm run start` or `yarn start`

---

## Deploy Contracts

The contract is already deployed to RSK testnet network. If you want to deploy the contract by yourself please follow the steps below:

1. Create a `.secret` file in your app root and paste your mnemonic which your wallet generates.

2. Open your terminal and install rsk local node: `java -cp rskj-core-2.0.1-PAPYRUS-all.jar co.rsk.Start --testnet`. (You must have java installed in your system.)

3. In order to compile and deploy your contracts you can use `truffle` library. Install truffle globally `npm i -g truffle`

4. In another terminal start truffle console `truffle console --network testnet`. Then first compile your contracts with `compile` command. After the process finished run `migrate` to deploy your contracts. You can run `migrate --reset` to deploy them again.

5. Now you can start your application `npm run start` or `yarn start`
