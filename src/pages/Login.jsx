import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, Heading, VStack, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/api';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
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
      const res = await login(form);
      toast({ title: 'Login berhasil', status: 'success', isClosable: true });
      navigate('/dashboard');
    } catch (err) {
      toast({ title: 'Error', description: err.message || 'Gagal login', status: 'error', isClosable: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={6} boxShadow="md" borderRadius="md">
      <Heading mb={6} textAlign="center">Login</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input type="email" value={form.email} onChange={handleChange} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" value={form.password} onChange={handleChange} />
          </FormControl>
          <Button type="submit" colorScheme="brand" width="full" isLoading={loading}>Login</Button>
        </VStack>
      </form>
    </Box>
  );
} 