import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, Heading, VStack, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { register } from '../utils/api';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', photoUrl: '' });
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await register(form);
      toast({ title: 'Berhasil registrasi', description: `Kode undangan: ${res.inviteCode}`, status: 'success', isClosable: true });
      navigate('/login');
    } catch (err) {
      toast({ title: 'Error', description: err.message || 'Gagal registrasi', status: 'error', isClosable: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={6} boxShadow="md" borderRadius="md">
      <Heading mb={6} textAlign="center">Register</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl id="name">
            <FormLabel>Full Name</FormLabel>
            <Input type="text" value={form.name} onChange={handleChange} />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input type="email" value={form.email} onChange={handleChange} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" value={form.password} onChange={handleChange} />
          </FormControl>
          <FormControl id="photoUrl">
            <FormLabel>Profile Picture URL</FormLabel>
            <Input type="text" value={form.photoUrl} onChange={handleChange} />
          </FormControl>
          <Button type="submit" colorScheme="brand" width="full" isLoading={loading}>Register</Button>
        </VStack>
      </form>
    </Box>
  );
} 