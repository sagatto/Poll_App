import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  CircularProgress,
  Text
} from "@chakra-ui/core";

import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

// Debug enable
const debug = 0;

function Login(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      if (debug) console.log(e);
      setIsLoading(false);
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
      <Box
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleFormSubmit}>
            <FormControl isRequired mt={6}>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="Email Address"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </FormControl>
            {error ? (
              <Box>
                <Text fontSize="sm" as="mark">The provided credentials are incorrect</Text>
              </Box>
            ) : null}
            <Button
              type="submit"
              variantColor="purple"
              variant="outline"
              width="full"
              mt={4}
            >
              {isLoading ? (
                <CircularProgress isIndeterminate size="24px" color="purple" />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}

export default Login;
