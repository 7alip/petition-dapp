import React from 'react';
import { Box, Icon, Link } from '@chakra-ui/core';

const Footer = () => {
  return (
    <Box bg="gray.200" py={4} color="gray.700" fontSize="sm" textAlign="center">
      Made with <Icon name="heart" color="red.400" /> by{' '}
      <Link href="https://github.com/7alip" target="_blank" color="brand">
        7alip
      </Link>
    </Box>
  );
};

export default Footer;
