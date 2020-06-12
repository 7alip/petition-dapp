import React from 'react';
import Header from './Header';
import { Flex } from '@chakra-ui/core';
import Container from './Container';
import Footer from './Footer';

const Layout = props => {
  return (
    <Flex minH="100vh" flexDir="column" fontFamily="brand">
      <Header />
      <Container py={5} flex="1">
        {props.children}
      </Container>
      <Footer />
    </Flex>
  );
};

export default Layout;
