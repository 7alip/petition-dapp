import React from 'react';
import { Button } from '@chakra-ui/core';

const PrimaryButton = props => {
  return (
    <Button
      {...props}
      bg="brand"
      boxShadow="0"
      _hover={{ bg: 'green.400' }}
      _active={{ bg: 'green.500', boxShadow: 'none' }}
      color="white"
    >
      {props.children}
    </Button>
  );
};

export default PrimaryButton;
