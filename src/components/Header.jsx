import React, { useState, useEffect } from 'react';
import { Box, Flex, Heading, Link as ChakraLink, Button, Icon, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

/**
 * Header component for site navigation with improved styling
 */
export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const bgColor = useColorModeValue('brand.500', 'brand.700');
  const textColor = useColorModeValue('white', 'white');

  useEffect(() => {
    // Check if user is logged in based on URL or local storage
    setIsLoggedIn(location.pathname.includes('dashboard') || localStorage.getItem('token'));
  }, [location]);

  return (
    <Box bg={bgColor} px={4} py={3} boxShadow="md" position="sticky" top={0} zIndex={10}>
      <Flex h={16} alignItems="center" justifyContent="space-between" maxW="container.xl" mx="auto">
        <Flex align="center">
          <Heading size="md" color={textColor} fontFamily="heading" letterSpacing="tight">
            <ChakraLink as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
              SeCinta
            </ChakraLink>
          </Heading>
        </Flex>
        
        <Flex alignItems="center" gap={4}>
          {isLoggedIn ? (
            <>
              <ChakraLink as={RouterLink} to="/dashboard" px={2} color={textColor} fontWeight={location.pathname === '/dashboard' ? 'bold' : 'normal'}>
                Dashboard
              </ChakraLink>
              <Button
                as={RouterLink} 
                to="/"
                variant="outline"
                size="sm"
                color={textColor}
                borderColor={textColor}
                _hover={{ bg: 'rgba(255,255,255,0.1)' }}
                onClick={() => {
                  localStorage.removeItem('token');
                  setIsLoggedIn(false);
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <ChakraLink as={RouterLink} to="/" px={2} color={textColor} fontWeight={location.pathname === '/' ? 'bold' : 'normal'}>
                Home
              </ChakraLink>
              <ChakraLink as={RouterLink} to="/login" px={2} color={textColor} fontWeight={location.pathname === '/login' ? 'bold' : 'normal'}>
                Login
              </ChakraLink>
              <Button 
                as={RouterLink} 
                to="/register" 
                variant="outline" 
                size="sm"
                color={textColor}
                borderColor={textColor}
                _hover={{ bg: 'rgba(255,255,255,0.1)' }}
              >
                Register
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
} 