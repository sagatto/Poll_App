import React from 'react';
import {
    Flex,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button
  } from '@chakra-ui/core';

  

function Login() {
    return (
      <Flex width="full" align="center" justifyContent="center">
        <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
          <Box textAlign="center">
            <Heading>Login</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="test@test.com" />
              </FormControl>
              <FormControl mt={6}>
                <FormLabel>Password</FormLabel>
                <Input type="password" placeholder="*******" />
              </FormControl>
              <Button type="submit" variantColor="purple" variant="outline" width="full" mt={4}>
                Sign In
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    );
  }

  export default Login;