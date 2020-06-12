import React, { useContext } from 'react';
import niftyWallet from '../static/nifty-wallet.png';
import metamask from '../static/metamask.png';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../App';
import { Stack, Heading, Image, Text, Link, PseudoBox } from '@chakra-ui/core';
import Container from '../components/layout/Container';

const Auth = ({ isPage }) => {
  const authContext = useContext(AuthContext);
  if (authContext && authContext.account) return <Redirect to="/" />;
  return (
    <Container flex="1" fontFamily="brand">
      <Stack
        minH={isPage ? '100vh' : 'auto'}
        flex="1"
        px={5}
        spacing={5}
        textAlign="center"
        justifyContent="center"
        alignItems="center"
      >
        <Heading as="h1">Welcome</Heading>
        <Text>This app needs ethereum crypto wallet extension.</Text>
        <Text>
          If you want to use the app properly, please install Metamask or Nifty
          Wallet extensions and create an account.
        </Text>
        <Stack isInline spacing={3}>
          <PseudoBox
            _hover={{ border: '1px solid gray' }}
            border="1px solid transparent"
            borderRadius="md"
            as="a"
            href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
            target="_blank"
          >
            <Image objectFit="cover" h={200} src={metamask} alt="Metamask" />
            <Heading fontSize="lg">Metamask</Heading>
            <Text color="brand">Add to Chrome</Text>
          </PseudoBox>
          <PseudoBox
            _hover={{ border: '1px solid gray' }}
            border="1px solid transparent"
            borderRadius="md"
            as="a"
            href="https://chrome.google.com/webstore/detail/nifty-wallet/jbdaocneiiinmjbjlgalhcelgbejmnid"
            target="_blank"
          >
            <Image
              objectFit="cover"
              h={200}
              src={niftyWallet}
              alt="Nifty Wallet"
            />
            <Heading fontSize="lg">Nifty Wallet</Heading>
            <Text color="brand">Add to Chrome</Text>
          </PseudoBox>
        </Stack>
        <Stack>
          <Text>
            If you have the extension already, please refresh the page after
            login your wallet account.
          </Text>
          <Text>
            For mor information please visit{' '}
            <Link
              target="_blank"
              href="https://github.com/7alip/petition-dapp"
              color="brand"
              fontWeight="bold"
            >
              repo
            </Link>
          </Text>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Auth;
