import React from 'react';
import { Box, Heading, Text, Flex, Badge, IconButton } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

/**
 * A reusable goal card component for displaying bucket list goals
 * @param {Object} props - Component props
 * @param {Object} props.goal - The goal object with title, description, date
 * @param {Function} props.onEdit - Function to call when edit button is clicked
 * @param {Function} props.onDelete - Function to call when delete button is clicked 
 * @param {string} props.variant - Card style variant ('default', 'compact', or 'highlight')
 */
export default function GoalCard({ goal, onEdit, onDelete, variant = 'default' }) {
  const { id, title, description, date } = goal;
  
  if (variant === 'compact') {
    return (
      <Flex 
        justify="space-between" 
        p={3} 
        borderRadius="md" 
        borderWidth="1px" 
        borderColor="gray.200"
        _hover={{ bg: 'gray.50' }}
      >
        <Box>
          <Heading size="sm">{title}</Heading>
          <Text fontSize="sm" color="gray.600">{date}</Text>
        </Box>
        <Flex gap={2}>
          {onEdit && (
            <IconButton 
              aria-label="Edit goal" 
              icon={<EditIcon />} 
              size="sm" 
              variant="ghost" 
              onClick={() => onEdit(goal)}
            />
          )}
          {onDelete && (
            <IconButton 
              aria-label="Delete goal" 
              icon={<DeleteIcon />} 
              size="sm" 
              variant="ghost" 
              colorScheme="red" 
              onClick={() => onDelete(id)}
            />
          )}
        </Flex>
      </Flex>
    );
  }
  
  if (variant === 'highlight') {
    return (
      <Box 
        p={4} 
        borderRadius="md" 
        bg="brand.50" 
        borderLeft="4px solid" 
        borderLeftColor="brand.500"
      >
        <Flex justify="space-between" align="center">
          <Heading size="sm" color="brand.700">{title}</Heading>
          <Badge colorScheme="pink">{date}</Badge>
        </Flex>
        {description && <Text mt={2} fontSize="sm">{description}</Text>}
        {(onEdit || onDelete) && (
          <Flex mt={3} justify="flex-end" gap={2}>
            {onEdit && (
              <IconButton 
                aria-label="Edit goal" 
                icon={<EditIcon />} 
                size="sm" 
                variant="ghost" 
                onClick={() => onEdit(goal)}
              />
            )}
            {onDelete && (
              <IconButton 
                aria-label="Delete goal" 
                icon={<DeleteIcon />} 
                size="sm" 
                variant="ghost" 
                colorScheme="red" 
                onClick={() => onDelete(id)}
              />
            )}
          </Flex>
        )}
      </Box>
    );
  }
  
  // Default variant
  return (
    <Box 
      p={4} 
      borderRadius="lg" 
      boxShadow="md" 
      bg="white"
      transition="all 0.2s"
      _hover={{ boxShadow: 'lg', transform: 'translateY(-2px)' }}
    >
      <Flex justify="space-between" align="center">
        <Heading size="md" color="brand.700">{title}</Heading>
        <Badge colorScheme="pink">{date}</Badge>
      </Flex>
      {description && <Text mt={3}>{description}</Text>}
      {(onEdit || onDelete) && (
        <Flex mt={4} justify="flex-end" gap={2}>
          {onEdit && (
            <IconButton 
              aria-label="Edit goal" 
              icon={<EditIcon />} 
              size="sm" 
              colorScheme="brand" 
              variant="ghost" 
              onClick={() => onEdit(goal)}
            />
          )}
          {onDelete && (
            <IconButton 
              aria-label="Delete goal" 
              icon={<DeleteIcon />} 
              size="sm" 
              colorScheme="red" 
              variant="ghost" 
              onClick={() => onDelete(id)}
            />
          )}
        </Flex>
      )}
    </Box>
  );
} 