import React from 'react';
import PetitionCard from './PetitionCard';
import { SimpleGrid } from '@chakra-ui/core';

const PetitionList = ({ petitions }) => (
  <SimpleGrid columns={[1, null, 2]} spacing={5}>
    {petitions.map(petition => (
      <PetitionCard key={petition.id} petition={petition} />
    ))}
  </SimpleGrid>
);

export default PetitionList;
