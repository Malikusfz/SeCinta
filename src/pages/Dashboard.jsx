import React, { useState, useEffect } from 'react';
import { 
  Box, Heading, Text, Spinner, List, ListItem, Button, useDisclosure, 
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton,
  Grid, Flex, FormControl, FormLabel, Input, Textarea, IconButton, Badge,
  useToast, Card, CardBody, CardHeader, VStack
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import { fetchGoals, createGoal } from '../utils/api';

export default function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { 
    isOpen: isFormOpen, 
    onOpen: onFormOpen, 
    onClose: onFormClose 
  } = useDisclosure();
  const toast = useToast();
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newGoal, setNewGoal] = useState({ title: '', description: '', date: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = () => {
    setLoading(true);
    fetchGoals()
      .then((data) => setGoals(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const filteredGoals = goals.filter((g) => g.date === format(selectedDate, 'yyyy-MM-dd'));

  const handleAddGoal = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await createGoal({
        ...newGoal,
        date: format(selectedDate, 'yyyy-MM-dd')
      });
      
      // In a real app, we'd add the returned goal from API
      // For now, simulate by creating a goal with random ID
      setGoals(prev => [...prev, {
        id: Date.now(),
        title: newGoal.title,
        description: newGoal.description,
        date: format(selectedDate, 'yyyy-MM-dd')
      }]);
      
      setNewGoal({ title: '', description: '', date: '' });
      onFormClose();
      toast({
        title: 'Goal dibuat!',
        description: 'Goal baru berhasil ditambahkan.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Gagal menambahkan goal',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewGoal(prev => ({ ...prev, [name]: value }));
  };

  const handleCalendarClick = (date) => {
    setSelectedDate(date);
    onOpen();
  };

  if (loading) {
    return (
      <Flex p={8} height="80vh" align="center" justify="center">
        <Spinner size="xl" color="brand.500" thickness="4px" />
      </Flex>
    );
  }

  return (
    <Box p={{ base: 4, md: 8 }} maxW="container.xl" mx="auto">
      <Heading mb={6} textAlign="center" color="brand.700">Bucket List Anda</Heading>
      
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
        <Box>
          <Calendar
            onClickDay={handleCalendarClick}
            value={selectedDate}
            className="custom-calendar"
            tileContent={({ date }) => {
              if (goals.some((g) => g.date === format(date, 'yyyy-MM-dd'))) {
                return <Box mt={1} fontSize="0.6em" bg="brand.500" borderRadius="full" w={2} h={2} mx="auto" />;
              }
              return null;
            }}
          />
          
          <Card mt={6} boxShadow="md" bg="white">
            <CardHeader pb={0}>
              <Heading size="md">Goals Terakhir</Heading>
            </CardHeader>
            <CardBody>
              {goals.length === 0 ? (
                <Text>Belum ada goals.</Text>
              ) : (
                <VStack align="stretch" spacing={3}>
                  {goals.slice(-3).reverse().map((goal) => (
                    <Box 
                      key={goal.id} 
                      p={3} 
                      borderRadius="md" 
                      bg="brand.50" 
                      borderLeft="4px solid" 
                      borderLeftColor="brand.500"
                    >
                      <Flex justify="space-between" align="center">
                        <Heading size="sm">{goal.title}</Heading>
                        <Badge colorScheme="pink">{goal.date}</Badge>
                      </Flex>
                      {goal.description && <Text mt={1} fontSize="sm">{goal.description}</Text>}
                    </Box>
                  ))}
                </VStack>
              )}
            </CardBody>
          </Card>
        </Box>
        
        <Box>
          <Card boxShadow="md" bg="white">
            <CardHeader pb={0}>
              <Flex justify="space-between" align="center">
                <Heading size="md">Rencana Bucket List</Heading>
                <Button 
                  leftIcon={<AddIcon />} 
                  colorScheme="brand" 
                  size="sm" 
                  onClick={() => {
                    setNewGoal({ title: '', description: '', date: format(new Date(), 'yyyy-MM-dd') });
                    onFormOpen();
                  }}
                >
                  Tambah Goal
                </Button>
              </Flex>
            </CardHeader>
            <CardBody>
              <Text mb={4}>Buat rencana indah bersama pasangan dan jadikan bucket list Anda menjadi kenangan.</Text>
              
              {goals.length > 0 ? (
                <List spacing={3}>
                  {goals.map((goal) => (
                    <ListItem key={goal.id}>
                      <Flex 
                        justify="space-between" 
                        p={3} 
                        borderRadius="md" 
                        borderWidth="1px" 
                        borderColor="gray.200"
                        _hover={{ bg: 'gray.50' }}
                      >
                        <Box>
                          <Heading size="sm">{goal.title}</Heading>
                          <Text fontSize="sm" color="gray.600">{goal.date}</Text>
                        </Box>
                        <Flex gap={2}>
                          <IconButton 
                            aria-label="Edit goal" 
                            icon={<EditIcon />} 
                            size="sm" 
                            variant="ghost" 
                          />
                          <IconButton 
                            aria-label="Delete goal" 
                            icon={<DeleteIcon />} 
                            size="sm" 
                            variant="ghost" 
                            colorScheme="red" 
                          />
                        </Flex>
                      </Flex>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Text>Belum ada goals. Silakan buat goal pertama Anda.</Text>
              )}
            </CardBody>
          </Card>
        </Box>
      </Grid>
      
      {/* Modal for viewing goals on selected date */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="brand.50" color="brand.700">
            Goals untuk {format(selectedDate, 'dd MMMM yyyy')}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={4}>
            {filteredGoals.length === 0 ? (
              <Text>Tidak ada goals untuk tanggal ini.</Text>
            ) : (
              <List spacing={3}>
                {filteredGoals.map((goal) => (
                  <ListItem key={goal.id}>
                    <Box p={3} borderRadius="md" bg="brand.50">
                      <Heading size="sm">{goal.title}</Heading>
                      {goal.description && <Text mt={2}>{goal.description}</Text>}
                    </Box>
                  </ListItem>
                ))}
              </List>
            )}
          </ModalBody>
          <ModalFooter>
            <Button 
              colorScheme="brand" 
              mr={3} 
              onClick={() => {
                setNewGoal({ title: '', description: '', date: format(selectedDate, 'yyyy-MM-dd') });
                onClose();
                onFormOpen();
              }}
            >
              Tambah Goal
            </Button>
            <Button variant="ghost" onClick={onClose}>Tutup</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      {/* Modal for adding new goal */}
      <Modal isOpen={isFormOpen} onClose={onFormClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="brand.50" color="brand.700">Tambah Goal Baru</ModalHeader>
          <ModalCloseButton />
          <ModalBody py={4}>
            <form onSubmit={handleAddGoal}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Judul Goal</FormLabel>
                  <Input 
                    name="title"
                    value={newGoal.title}
                    onChange={handleChange}
                    placeholder="Contoh: Pergi ke Bali"
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel>Deskripsi</FormLabel>
                  <Textarea
                    name="description"
                    value={newGoal.description}
                    onChange={handleChange}
                    placeholder="Detail rencana..."
                    rows={4}
                  />
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel>Tanggal Target</FormLabel>
                  <Input
                    name="date"
                    type="date"
                    value={format(selectedDate, 'yyyy-MM-dd')}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  />
                </FormControl>
                
                <Button 
                  type="submit" 
                  colorScheme="brand" 
                  width="full" 
                  mt={4}
                  isLoading={isSubmitting}
                >
                  Simpan Goal
                </Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
} 