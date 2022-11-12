import React from 'react';
import { Text, Box } from '@chakra-ui/react';

export default function Header() {
  return (
    <Box w="100%" h="60px" background={'teal'} display="flex" alignItems="center" paddingLeft='20px' position='fixed' zIndex={1}>
      <Text fontSize='3xl' fontWeight='bold' color='#FFF'>Job Search Application</Text>
    </Box>
  )
}
