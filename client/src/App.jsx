import React, { useState } from 'react';
import { Box, Button, Flex, Text, useMediaQuery } from '@chakra-ui/react';
import NewPerson from './components/NewPersonModal';
import CensusTable from './components/CensusTable';
import LineChart from './components/LineChart';
import BarChart from './components/BarChart';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const [refresh, setRefresh] = useState(false);

  const refreshHandler = () => {
    setRefresh(!refresh);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Box h="100vh">
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
      <NewPerson
        isOpen={isOpen}
        onClose={closeModal}
        refreshHandler={refreshHandler}
      />

      <Flex
        justifyContent="center"
        gap={10}
        flexDirection={isMobile ? 'column' : 'row'}
      >
        <Box width="600px">
          <CensusTable refresh={refresh} />
        </Box>

        <Flex flexDirection="column" gap={5}>
          <LineChart refresh={refresh} />
          <BarChart refresh={refresh} />
        </Flex>
      </Flex>
    </Box>
  );
};

export default App;
