import { useState, useContext } from 'react';

import { AuthContext } from '../App';

export default function useContract() {
  const { web3, contractInstance, account } = useContext(AuthContext);

  const [error, setError] = useState(false);

  const createPetition = async (
    title,
    description,
    petitioning,
    goal,
    categoryIndex,
    recipient,
  ) => {
    try {
      await contractInstance.methods
        .createPetition(
          title,
          description,
          petitioning,
          goal,
          categoryIndex,
          recipient.toLowerCase(),
        )
        .send({ from: account });
    } catch (error) {
      console.error('error', error);
      setError(error);
    }
  };

  const signPetition = async id => {
    try {
      await contractInstance.methods.sign(id).send({ from: account });
    } catch (error) {
      console.error('Sign error', error);
      setError(error);
    }
  };

  // Fake donation process
  const donatePetition = async (id, value) => {
    try {
      const ether = web3.utils.toWei(value, 'ether');
      await contractInstance.methods
        .donate(id, ether)
        .send({ from: account })
        .then(receipt => console.log('receipt', receipt));
    } catch (error) {
      console.error('Donate error', error);
      setError(error);
    }
  };

  const getPetition = async id => {
    try {
      return await contractInstance.methods.petitions(id).call();
    } catch (error) {
      console.error('Get error', error);
      setError(error);
    }
  };

  const getPetitionCount = async () => {
    try {
      return await contractInstance.methods.petitionCount().call();
    } catch (error) {
      console.error('Get error', error);
      setError(error);
    }
  };

  const completePetition = async id => {
    try {
      return await contractInstance.methods.completePetition(id).call();
    } catch (error) {
      console.error('Get error', error);
      setError(error);
    }
  };

  const getAllPetitions = async () => {
    try {
      const petitionCount = await getPetitionCount();
      const petitions = await Promise.all(
        Array(parseInt(petitionCount))
          .fill()
          .map(async (count, index) => {
            const _petition = await contractInstance.methods
              .petitions(index)
              .call();

            if (account) {
              const isSigned = await contractInstance.methods
                .isSigned(index, account)
                .call();
              _petition.isSigned = isSigned;
            }

            return _petition;
          }),
      );

      return petitions;
    } catch (error) {
      console.error('Get error', error);
      setError(error);
    }
  };

  return {
    completePetition,
    getAllPetitions,
    getPetitionCount,
    getPetition,
    donatePetition,
    signPetition,
    createPetition,
    error,
  };
}
