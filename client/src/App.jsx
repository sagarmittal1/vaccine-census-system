import React, { useState } from 'react';
import NewPerson from './components/NewPersonModal';
import { Button } from '@chakra-ui/react';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Button colorScheme="teal" onClick={openModal}>
        Add User
      </Button>
      <NewPerson isOpen={isOpen} onClose={closeModal} />
    </div>
  );
};

export default App;
