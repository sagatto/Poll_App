import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import Auth from "../utils/auth";
import { ADD_POLL } from "../utils/mutations";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  Textarea,
  FormLabel,
  Button,
} from "@chakra-ui/core";
// Debug enable
const debug = 0;
function CreateQuestion() {
  const [formState, setFormState] = useState({ question: "" });
  const [addPoll] = useMutation(ADD_POLL);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await addPoll({
        variables: { question: formState.question },
      });
    } catch (e) {
      if (debug) console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  return (
    <Flex width="full" align="center" justifyContent="center">
      {Auth.loggedIn() ? (
        <Box
          p={8}
          maxWidth="80%"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <Box textAlign="center">
            <Heading>Post Questions to Dory</Heading>
          </Box>
          <Box my={4} textAlign="center">
            <form onSubmit={handleFormSubmit}>
              <FormControl isRequired>
                <FormLabel> Your Question: </FormLabel>
                <Textarea
                  name="question"
                  type="text"
                  wrap="wrap"
                  placeholder="Enter your question here"
                  height="100px"
                  onChange={handleChange}
                />
              </FormControl>
              <Button
                type="submit"
                variantColor="purple"
                variant="outline"
                width="full"
                mt={4}
              >
                Add Anonymously
              </Button>
            </form>
          </Box>
        </Box>
      ) : (
        <Box textAlign="center">
          <Heading>Dory Login required to post a Question</Heading>
        </Box>
      )}
    </Flex>
  );
}
export default CreateQuestion;