import React, { useContext, useEffect, useState } from 'react';
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Stack,
  Heading,
  Text,
  Divider,
  Icon,
  Box,
} from '@chakra-ui/core';
import { AuthContext } from '../App';
import useContract from '../ethereum/useContract';
import PrimaryButton from '../components/PrimaryButton';

const Me = () => {
  const { getAllPetitions, completePetition } = useContract();
  const { account } = useContext(AuthContext);
  const [petitions, setPetitions] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getAllPetitions();
      setPetitions(data);
    };
    if (account) getData();
  }, []);

  const signedPetitions = petitions.filter(petition => petition.isSigned);
  const createdPetitions = petitions.filter(
    petition => petition.creator === account,
  );

  const PetitionItem = ({ petition }) => (
    <Stack my={4} p={4} boxShadow="md">
      <Heading>{petition.title}</Heading>
      <Text>{petition.description}</Text>
      <Divider />
      <Box>
        <Stack isInline justifyContent="space-between">
          <Text fontSize="sm" textAlign="center">
            <Icon size="20px" color="brand" name="humans" />{' '}
            <strong>{petition.signedCount} signed</strong> of{' '}
            {petition.goalCount} goal
          </Text>
          <Text fontSize="sm" textAlign="center">
            <Icon size="20px" color="red.300" name="economy" />{' '}
            {petition.donation / 1000000000000000000} donated
          </Text>
        </Stack>
        {!petition.expired && (
          <>
            <Divider />
            <PrimaryButton onClick={() => completePetition(petition.id)}>
              Complete Petition
            </PrimaryButton>
          </>
        )}
      </Box>
    </Stack>
  );

  return (
    <Tabs>
      <TabList>
        <Tab>Created Petition(s) ({createdPetitions.length})</Tab>
        <Tab>Signed Petition(s) ({signedPetitions.length})</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          {createdPetitions.length > 0
            ? createdPetitions.map(petition => (
                <PetitionItem key={petition.id} petition={petition} />
              ))
            : 'No created petition!'}
        </TabPanel>
        <TabPanel>
          {signedPetitions.length > 0
            ? signedPetitions.map(petition => (
                <PetitionItem key={petition.id} petition={petition} />
              ))
            : 'No signed petitions!'}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Me;
