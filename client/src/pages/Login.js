import {
    Flex,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button
  } from '@chakra-ui/core';
  
import React, { useState } from "react";
import { useMutation } from '@apollo/react-hooks';
import { LOGIN } from "../utils/mutations"
import Auth from "../utils/auth";

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' })
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      const mutationResponse = await login({ variables: { email: formState.email, password: formState.password } })
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e)
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };
  return (
      <Flex width="full" align="center" justifyContent="center">
        <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
          <Box textAlign="center">
            <Heading>Login</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={handleFormSubmit}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input name="email" type="email" placeholder="Email Address" onChange={handleChange}/>
              </FormControl>
              <FormControl isRequired mt={6}>
                <FormLabel>Password</FormLabel>
                <Input name="password" type="password" placeholder="Password" onChange={handleChange}/>
              </FormControl>
              {
                error ? <Box>
                <p className="error-text" >The provided credentials are incorrect</p>
                </Box> : null
              }
              <Button type="submit" variantColor="purple" variant="outline" width="full" mt={4} >
                Sign In
              </Button>

            </form>
          </Box>
        </Box>
      </Flex>
    );
  }

  export default Login;