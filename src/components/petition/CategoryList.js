import React from 'react';
import {
  SimpleGrid,
  Text,
  AspectRatioBox,
  Flex,
  Heading,
  Stack,
  PseudoBox,
} from '@chakra-ui/core';

const CategoryList = ({ selectedCategory, selectCategory }) => {
  const categories = [
    'Local',
    'Health',
    'Racial justice',
    'Human rights',
    'Economic justice',
    'Politics',
    'Animals',
    'Women"s rights',
    'Environment',
    'Family',
    'Criminal justice',
    'Entertainment',
    'Immigration',
    'Food',
    'Education',
    'Other',
  ];

  return (
    <Stack spacing={5}>
      <Heading as="h2" size="xl">
        What kind of issue are you petitioning on?
      </Heading>
      <Text>
        Selecting a topic allows Change.org to recommend your petition to
        interested supporters.
      </Text>
      <SimpleGrid gridGap={[2, 3, 4]} columns={[3, null, 4]}>
        {categories.map((category, i) => (
          <AspectRatioBox
            ratio={1 / 1}
            key={category}
            spacing={2}
            onClick={() => selectCategory(i)}
          >
            <PseudoBox
              as={Flex}
              _hover={{ cursor: 'pointer' }}
              h="full"
              bg={selectedCategory === i ? 'brand' : 'white'}
              borderColor={selectedCategory === i ? 'transparent' : 'brand'}
              borderWidth={2}
              justifyContent="center"
              alignItems="center"
              borderRadius="100%"
              p={2}
            >
              <Text
                fontSize={['xs', 'sm', 'lg']}
                fontWeight={700}
                textAlign="center"
              >
                {category}
              </Text>
            </PseudoBox>
          </AspectRatioBox>
        ))}
      </SimpleGrid>
    </Stack>
  );
};

export default CategoryList;
