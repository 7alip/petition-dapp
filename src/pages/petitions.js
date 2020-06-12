import React, { useEffect, useState } from 'react';
import useContract from '../ethereum/useContract';
import PetitionList from '../components/petition/PetitionList';

const PetitionPage = () => {
  const [petitions, setPetitions] = useState([]);
  const { getAllPetitions, error } = useContract();

  useEffect(() => {
    const getData = async () => {
      const data = await getAllPetitions();
      setPetitions(data);
    };
    getData();
  }, []);

  return (
    <div>
      {petitions.length === 0 ? (
        'Loading'
      ) : error ? (
        'Error'
      ) : (
        <PetitionList petitions={petitions} />
      )}
    </div>
  );
};

export default PetitionPage;
