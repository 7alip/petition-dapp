const path = require('path');
const HDWalletProvider = require('@truffle/hdwallet-provider');

const fs = require('fs');

const mnemonic = fs.readFileSync('.secret').toString().trim();
if (!mnemonic || mnemonic.split(' ').length !== 12) {
  throw new Error('unable to retrieve mnemonic from .secret');
}

const gasPriceTestnetRaw = fs
  .readFileSync('.gas-price-testnet.json')
  .toString()
  .trim();
const gasPriceTestnet = parseInt(JSON.parse(gasPriceTestnetRaw).result, 16);
if (typeof gasPriceTestnet !== 'number' || isNaN(gasPriceTestnet)) {
  throw new Error(
    'unable to retrieve network gas price from .gas-price-testnet.json',
  );
}

module.exports = {
  contracts_build_directory: path.join(__dirname, 'src/ethereum/abis'),
  networks: {
    develop: {
      port: 8545,
      network_id: 31,
    },
    mainnet: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          'https://public-node.rsk.co',
          0,
          1,
          true,
          "m/44'/137'/0'/0/",
        ),
      network_id: 30,
      gasPrice: 0x387ee40,
    },
    testnet: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          'https://public-node.testnet.rsk.co/2.0.1/',
          0,
          1,
          true,
          "m/44'/37310'/0'/0/",
        ),
      network_id: 31,
      gasPrice: Math.floor(gasPriceTestnet * 1.1),
      networkCheckTimeout: 1e9,
    },
  },
};
