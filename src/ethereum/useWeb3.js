import { useState, useEffect, useCallback } from 'react';
import Web3 from 'web3';
import ChangeAbi from './abis/Change.json';

export const getWeb3 = () => {
  return new Promise(async (resolve, reject) => {
    // Modern dapp browsers...
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      console.log('Injected ethereum detected.', web3);
      try {
        // Request account access if needed
        await window.ethereum.send('eth_requestAccounts');
        // Acccounts now exposed
        resolve(web3);
      } catch (error) {
        reject(error);
      }
    }

    // Legacy dapp browsers...
    else if (window.web3) {
      // Use Mist/MetaMask's provider.
      console.log('Injected web3 detected.', window.web3);
      resolve(window.web3);
    } else {
      resolve(null);
    }
  });
};

export default function useWeb3() {
  const [web3Info, setWeb3Info] = useState({
    web3: undefined,
    account: undefined,
    contractInstance: undefined,
  });
  const [error, setError] = useState(false);

  const getEthInfo = useCallback(async () => {
    try {
      const web3 = await getWeb3();

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = ChangeAbi.networks[networkId];

      const contractInstance = new web3.eth.Contract(
        ChangeAbi.abi,
        deployedNetwork && deployedNetwork.address,
      );

      const [account] = await web3.eth.getAccounts();

      return { web3, account, contractInstance };
    } catch (error) {
      console.error('error', error);
      setError(error);
    }
  }, []);

  useEffect(() => {
    getEthInfo().then(info => setWeb3Info(info));
  }, [getEthInfo]);

  return { ...web3Info, error, getEthInfo };
}
