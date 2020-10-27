import React from 'react';
import {
    Flex,
    Box,
    Heading,
    FormControl,
    Textarea,
    FormLabel,
    Input,
    Button
  } from '@chakra-ui/core';

  

  export default function CreateQuestion() {
    return (
      <Flex width="full" align="center" justifyContent="center">
        <Box p={8} maxWidth="80%" borderWidth={1} borderRadius={8} boxShadow="lg">
          <Box textAlign="center">
            <Heading>Post a Question for the CEO</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form>
              <FormControl>
                <FormLabel></FormLabel>
                <Textarea type="text" wrap="wrap" placeholder="Enter your question here!" height="100px" />
              </FormControl>
              <Button type="submit" variantColor="purple" variant="outline" width="full" mt={4}>
                Add Anonymously
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    );
  }