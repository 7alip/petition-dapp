import React, { useState } from 'react';
import useContract from '../../ethereum/useContract';
import {
  Button,
  Stack,
  Box,
  Heading,
  Text,
  Input,
  FormControl,
  Textarea,
  FormLabel,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/core';
import CategoryList from './CategoryList';

import PrimaryButton from '../PrimaryButton';

const initialState = {
  categoryIndex: undefined,
  title: '',
  description: '',
  goal: 0,
  recipient: '',
  petitioning: '',
};

const CreatePetition = () => {
  const [state, setState] = useState(initialState);
  const [error, setError] = useState(false);
  const [step, setStep] = useState(0);

  const {
    title,
    description,
    categoryIndex,
    goal,
    recipient,
    petitioning,
  } = state;

  const { createPetition } = useContract();

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    try {
      e.preventDefault();

      await createPetition(
        title,
        description,
        petitioning,
        goal,
        categoryIndex,
        recipient,
      );
    } catch (error) {
      console.error('error', error);
      setError(error);
    }
  };

  const isValid = () =>
    (step === 0 && categoryIndex >= 0) ||
    (step === 1 && !!title && !!description && goal > 0) ||
    (step === 2 && !!recipient && !!petitioning);

  const FormActionButtons = () => (
    <Box mt={5} textAlign="right">
      {step > 0 && (
        <Button size="md" mr={3} onClick={() => setStep(prev => prev - 1)}>
          Back
        </Button>
      )}
      {step < 2 && (
        <PrimaryButton
          size="md"
          onClick={() => setStep(prev => prev + 1)}
          isDisabled={!isValid()}
        >
          Continue
        </PrimaryButton>
      )}

      {step === 2 && (
        <PrimaryButton size="md" onClick={handleSubmit} isDisabled={!isValid()}>
          Send Petition
        </PrimaryButton>
      )}
    </Box>
  );

  return (
    <Box w={('full', null, 2 / 3)} mx="auto">
      {error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Error!</AlertTitle>
          <AlertDescription>An error occured!</AlertDescription>
        </Alert>
      ) : (
        <Box>
          {step === 0 && (
            <CategoryList
              selectCategory={index =>
                setState({ ...state, categoryIndex: index })
              }
              selectedCategory={categoryIndex}
            />
          )}
          {step === 1 && (
            <Stack spacing={5}>
              <Heading as="h2" size="xl">
                Write your petition title and description
              </Heading>
              <Text>
                This is the first thing people will see about your petition. Get
                their attention with a short title that focuses on the change
                you’d like them to support.
              </Text>
              <FormControl>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                  id="title"
                  name="title"
                  value={state.title}
                  size="md"
                  onChange={handleChange}
                  placeholder="Title"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Textarea
                  id="description"
                  name="description"
                  size="md"
                  value={description}
                  onChange={handleChange}
                  placeholder="Description"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="goal">Aimed signature count</FormLabel>
                <Input
                  id="goal"
                  name="goal"
                  size="md"
                  value={goal}
                  type="number"
                  onChange={handleChange}
                  placeholder="Aimed signature number"
                />
              </FormControl>
            </Stack>
          )}
          {step === 2 && (
            <Stack spacing={5}>
              <Heading as="h2" size="xl">
                Great! Who has the power to make this change?
              </Heading>
              <Text>
                Choose the recipient of your petition. This person or
                organization with the power to solve your problem or take the
                action you’re demanding.
              </Text>
              <FormControl>
                <FormLabel htmlFor="petitioning">Recipient</FormLabel>
                <Input
                  id="petitioning"
                  name="petitioning"
                  size="md"
                  value={petitioning}
                  onChange={handleChange}
                  placeholder="Recipient"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="recipient">Transferred Account</FormLabel>
                <Input
                  id="recipient"
                  name="recipient"
                  size="md"
                  value={recipient}
                  onChange={handleChange}
                  placeholder="Account"
                />
              </FormControl>
            </Stack>
          )}
        </Box>
      )}
      <FormActionButtons />
    </Box>
  );
};

export default CreatePetition;
