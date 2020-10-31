import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
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
} from "@chakra-ui/core";

function Signup(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [addUser] = useMutation(ADD_USER);
  // console.log("adduser:"+addUser);
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
      <Box
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <Box textAlign="center">
          <Heading>Join Dory Today!</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleFormSubmit}>
            <FormControl>
              <FormLabel>Sign Up</FormLabel>
              <Input name="email" type="email" id="email" placeholder="test@test.com" onChange={handleChange}/>
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Password</FormLabel>
              <Input name="password" type="password" id="pwd" placeholder="*******" onChange={handleChange}/>
            </FormControl>
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
