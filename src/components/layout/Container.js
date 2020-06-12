import React from 'react';
import { Stack } from '@chakra-ui/core';

const Container = props => {
  return (
    <Stack {...props} maxW={960} mx="auto" px={[1, 2, 3]} w="full">
      {props.children}
    </Stack>
  );
};

export default Container;
