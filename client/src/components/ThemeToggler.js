import React from 'react';
import { useColorMode, Button, Box, IconButton } from '@chakra-ui/core';

export default function ThemeToggler() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
      <Box textAlign="right" py={4} mr={12}>
        <Button variant="ghost"> Dory </Button>
        <Button variant="ghost"> Question </Button>
        <Button variant="ghost"> Login </Button>
        <IconButton
          icon={colorMode === 'light' ? 'moon' : 'sun'}
          onClick={toggleColorMode}
          variant="ghost"
        />
      </Box>
    );
  }