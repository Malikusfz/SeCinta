import React from 'react';
import { 
  Box, Heading, Text, Button, Stack, Flex, Image, 
  Container, VStack, useColorModeValue
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export default function Home() {
  const bgGradient = useColorModeValue(
    'linear(to-r, brand.50, cream.200)',
    'linear(to-r, brand.800, brand.900)'
  );

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        bg={bgGradient}
        pt={{ base: 10, md: 20 }} 
        pb={{ base: 16, md: 28 }}
        position="relative"
        overflow="hidden"
      >
        <Container maxW="container.xl">
          <Flex 
            direction={{ base: 'column', md: 'row' }} 
            align="center" 
            justify="space-between"
            gap={{ base: 8, md: 0 }}
          >
            <VStack 
              spacing={6} 
              align={{ base: 'center', md: 'flex-start' }}
              maxW={{ base: 'full', md: '50%' }}
              textAlign={{ base: 'center', md: 'left' }}
            >
              <Heading 
                as="h1" 
                size="2xl" 
                color="brand.700" 
                lineHeight="1.2"
                fontFamily="heading"
              >
                Jadikan Impian Bersama Jadi Kenyataan
              </Heading>
              
              <Text fontSize="xl" color="gray.600" maxW="lg">
                SeCinta membantu Anda dan pasangan mencatat, merencanakan, dan mewujudkan bucket list impian bersama.
              </Text>
              
              <Stack 
                direction={{ base: 'column', sm: 'row' }} 
                spacing={4} 
                w={{ base: 'full', sm: 'auto' }}
              >
                <Button 
                  as={RouterLink} 
                  to="/register" 
                  size="lg" 
                  colorScheme="brand" 
                  fontWeight="normal"
                  rounded="md"
                  fontSize="md"
                  px={8}
                >
                  Mulai Sekarang
                </Button>
                <Button 
                  as={RouterLink} 
                  to="/login" 
                  size="lg" 
                  variant="outline" 
                  fontWeight="normal"
                  colorScheme="brand"
                  rounded="md"
                  fontSize="md"
                  px={8}
                >
                  Login
                </Button>
              </Stack>
            </VStack>
            
            <Box 
              boxSize={{ base: '300px', md: '400px' }}
              position="relative"
              display={{ base: 'none', sm: 'block' }}
            >
              <Image
                src="https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=500&auto=format&fit=crop"
                fallbackSrc="https://via.placeholder.com/400"
                alt="Couple planning goals"
                objectFit="cover"
                borderRadius="xl"
                boxShadow="xl"
              />
              <Box 
                position="absolute"
                bottom="-30px"
                right="-30px"
                height="150px"
                width="150px"
                borderRadius="full"
                bg="gold.500"
                opacity="0.2"
                zIndex={-1}
              />
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxW="container.xl" py={{ base: 10, md: 20 }}>
        <VStack spacing={16}>
          <Heading 
            textAlign="center" 
            mb={4} 
            size="xl"
            color="brand.700"
          >
            Fitur Unggulan
          </Heading>
          
          <Flex 
            wrap="wrap" 
            justify="center" 
            gap={8}
          >
            <FeatureCard
              title="Kalender Interaktif"
              description="Lihat dan kelola bucket list Anda dalam tampilan kalender yang intuitif dan mudah digunakan."
              icon="📅"
            />
            <FeatureCard
              title="Berbagi dengan Pasangan"
              description="Undang pasangan Anda dan rencanakan impian bersama dalam satu platform."
              icon="💑"
            />
            <FeatureCard
              title="Desain Romantis"
              description="Tampilan yang indah dan romantis untuk menyimpan momen-momen berharga Anda."
              icon="💖"
            />
          </Flex>

          <Box textAlign="center" mt={8}>
            <Button
              as={RouterLink}
              to="/register"
              colorScheme="brand"
              size="lg"
              px={8}
              fontWeight="normal"
            >
              Daftar Gratis
            </Button>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}

// Feature card component
function FeatureCard({ title, description, icon }) {
  return (
    <Box 
      w={{ base: 'full', md: '300px' }}
      p={6}
      borderRadius="lg"
      boxShadow="md"
      bg="white"
      textAlign="center"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
    >
      <Text fontSize="4xl" mb={4}>{icon}</Text>
      <Heading size="md" mb={3} color="brand.700">{title}</Heading>
      <Text color="gray.600">{description}</Text>
    </Box>
  );
} 