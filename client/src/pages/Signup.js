import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text
} from "@chakra-ui/core";

function Signup(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [addUser, { error }] = useMutation(ADD_USER);
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
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
      <Box p={8} maxWidth="80%" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Box textAlign="center">
          <Heading>Join Dory Today!</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleFormSubmit}>
            <FormControl isRequired mt={6}>
              <FormLabel>Sign Up</FormLabel>
              <Input
                name="email"
                type="email"
                id="email"
                placeholder="test@test.com"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                id="pwd"
                placeholder="*******"
                onChange={handleChange}
              />
            </FormControl>
            {error ? (
              <Box>
                <Text fontSize="sm" color="purple">Username is taken</Text>
              </Box>
            ) : null}
            <Button
              type="submit"
              variantColor="purple"
              variant="outline"
              width="full"
              mt={4}
            >
              Create Account
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}

export default Signup;
