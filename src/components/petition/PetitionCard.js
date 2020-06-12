import React, { useState, useContext } from 'react';
import {
  Heading,
  Text,
  Button,
  Stack,
  Divider,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  useDisclosure,
  InputGroup,
  InputLeftAddon,
  Progress,
  Box,
  Badge,
} from '@chakra-ui/core';
import useContract from '../../ethereum/useContract';
import PrimaryButton from '../PrimaryButton';
import { AuthContext } from '../../App';

const PetitionCard = ({ petition }) => {
  const [amount, setAmount] = useState(0);

  const { account } = useContext(AuthContext);

  const { signPetition, donatePetition } = useContract();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack
      spacing={3}
      p={3}
      boxShadow="md"
      borderWidth="1px"
      borderColor="gray.200"
    >
      <Heading as="h2" size="lg">
        {petition.title}{' '}
        {petition.expired && (
          <Badge ml="1" fontSize="0.8em" variant="outline" variantColor="red">
            Expired
          </Badge>
        )}
      </Heading>
      <Text>{petition.description}</Text>
      <Divider />
      <Box>
        <Text fontSize="sm" mb={3}>
          <strong>Petitioning:</strong> {petition.petitioning}
        </Text>
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
        <Progress
          mt={2}
          color="green"
          hasStripe
          isAnimated
          value={(petition.signedCount / petition.goalCount) * 100}
        />
      </Box>
      <Divider />
      {account && !petition.expired && (
        <>
          <Stack isInline justifyContent="center" spacing={3}>
            {petition.isSigned ? (
              <Button isDisabled>Signed</Button>
            ) : (
              <PrimaryButton onClick={() => signPetition(petition.id)}>
                Sign Petition
              </PrimaryButton>
            )}
            <Button onClick={onOpen}>Donate</Button>
          </Stack>
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create your account</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Amount</FormLabel>
                  <InputGroup>
                    <InputLeftAddon children="wei" />
                    <Input
                      type="number"
                      step="0.5"
                      onChange={e => setAmount(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <PrimaryButton
                  isDisabled={amount < 1}
                  onClick={() => {
                    donatePetition(petition.id, amount);
                    onClose();
                  }}
                  mr={3}
                >
                  Donate
                </PrimaryButton>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </Stack>
  );
};

export default PetitionCard;
