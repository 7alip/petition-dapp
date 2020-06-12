import React, { useRef, useContext } from 'react';
import {
  Box,
  Heading,
  Button,
  Icon,
  ButtonGroup,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Link,
  Flex,
  useDisclosure,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from '@chakra-ui/core';
import Container from './Container';
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '../../App';

const HeaderNav = props => {
  const { account } = useContext(AuthContext);

  const HeaderNavItem = props => (
    <Button
      {...props}
      boxShadow="0"
      variant="ghost"
      _active={{ bg: 'transparent' }}
      _focus={{ boxShadow: '0', bg: 'transparent' }}
      _hover={{ color: 'brand', bg: 'transparent' }}
      as={RouterLink}
    >
      {props.text}
    </Button>
  );

  return (
    <Flex {...props} flexDir={['column', null, 'row']} flex="1">
      <ButtonGroup d="flex" flexDir={['column', null, 'row']} flex="1" as="nav">
        <HeaderNavItem to="/start" text="Start petition" />
        <HeaderNavItem to="/me" text="My petitions" />
        <HeaderNavItem to="/petitions" text="Browse" />
      </ButtonGroup>
      {account ? (
        <Menu as={Box}>
          <MenuButton justifySelf="flex-end">
            <Icon name="profile" size="30px" />
          </MenuButton>
          <MenuList>
            <MenuItem textAlign="center" wordBreak="break-all">
              <Link
                href={`https://explorer.testnet.rsk.co/address/${account}`}
                target="_blank"
              >
                Explore Account
              </Link>
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Button variant="outline" as={Link} to="/auth">
          Login
        </Button>
      )}
    </Flex>
  );
};

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <Box borderBottom="1px solid gray.100" boxShadow="sm" py={3}>
      <Container>
        <Flex alignItems="center">
          <Heading
            mr={[1, 2, 3]}
            as={RouterLink}
            to="/"
            size="lg"
            color="brand"
          >
            PetitionDapp
          </Heading>
          <HeaderNav d={['none', null, 'flex']} />
          <IconButton
            d={['flex', null, 'none']}
            ml="auto"
            variant="outline"
            icon="menu"
            onClick={onOpen}
          />
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Menu</DrawerHeader>
              <DrawerBody>
                <HeaderNav />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
