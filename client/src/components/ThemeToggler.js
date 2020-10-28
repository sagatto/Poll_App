import React from 'react';
import { useColorMode, Button, Link, Box, IconButton } from '@chakra-ui/core';

export default function ThemeToggler() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
      <Box textAlign="right" py={4} mr={12}>
        <Link variant="ghost" link="/"> Dory </Link>
        <Link variant="ghost" href="/createquestion" width="20%"> Question </Link>
        <Link variant="ghost" href="/login" > Login </Link>
        <Link variant="ghost" href="/signup">SignUp</Link>
        <IconButton
          icon={colorMode === 'light' ? 'moon' : 'sun'}
          onClick={toggleColorMode}
          variant="ghost"
          margin="2px"
        />
      </Box>
    );
  }