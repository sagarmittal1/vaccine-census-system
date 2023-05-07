import React, { useState } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import NewPerson from './components/NewPersonModal';
import CensusTable from './components/CensusTable';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Box height='100vh'>
      <Flex
        h={16}
        bg="gray.100"
        alignItems="center"
        justifyContent="space-between"
        px={4}
      >
        <Text fontSize="2xl">Census System & Trend Analysis</Text>
        <Button colorScheme="teal" onClick={openModal}>
          Add User
        </Button>
      </Flex>
      <NewPerson isOpen={isOpen} onClose={closeModal} />

      <CensusTable />
    </Box>
  );
};

export default App;
