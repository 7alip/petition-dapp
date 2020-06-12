import React from 'react';
import { Stack, Heading } from '@chakra-ui/core';
import map from '../static/map.png';
import { Link } from 'react-router-dom';
import PrimaryButton from '../components/PrimaryButton';

const Home = () => {
  return (
    <Stack
      justifyContent="center"
      minH={300}
      backgroundSize="cover"
      backgroundImage={`url(${map})`}
      backgroundPosition="top"
    >
      <Stack spacing={5} textAlign="center" alignItems="center">
        <Heading>The world’s platform for change</Heading>
        <PrimaryButton size="lg" as={Link} to="/start">
          Start a petition
        </PrimaryButton>
      </Stack>
    </Stack>
  );
};

export default Home;
