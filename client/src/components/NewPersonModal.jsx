import React, { useRef, useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  useMediaQuery,
  useToast,
} from '@chakra-ui/react';

const NewPerson = ({ isOpen, onClose, refreshHandler }) => {
  const toast = useToast();
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const nameRef = useRef();
  const [gender, setGender] = useState('male');
  const [birthdate, setBirthdate] = useState('');
  const [vaccinated, setVaccinated] = useState(false);

  const submitHandler = async () => {
    const data = {
      fullname: nameRef.current.value,
      is_vaccinated: vaccinated,
      birthdate: birthdate,
      gender: gender,
    };

    try {
      const response = await fetch('http://localhost:5000/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: 'Details added successfully',
          status: 'success',
          variant: 'solid',
          duration: '1000',
          isClosable: false,
        });
      }

      refreshHandler();

      onClose();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={isMobile ? 'sm' : 'md'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Person Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <FormLabel pt={2}>Name</FormLabel>
            <Input ref={nameRef} />
          </FormControl>

          <FormControl display="flex" mt="5">
            <FormLabel mr="5">Gender</FormLabel>
            <RadioGroup defaultValue="male" onChange={(e) => setGender(e)}>
              <Stack direction="row" spacing="4">
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
                <Radio value="other">Other</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>

          <FormControl display="flex" mt="4" alignItems="center">
            <FormLabel pt={2}>Birthdate</FormLabel>
            <Input type="date" onChange={(e) => setBirthdate(e.target.value)} />
          </FormControl>

          <FormControl display="flex" mt="5">
            <FormLabel>Vaccinated</FormLabel>
            <RadioGroup
              onChange={(e) =>
                e === 'yes' ? setVaccinated(true) : setVaccinated(false)
              }
            >
              <Stack direction="row" spacing="4">
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose} mr={2}>
            Close
          </Button>
          <Button variant="solid" colorScheme="blue" onClick={submitHandler}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewPerson;
