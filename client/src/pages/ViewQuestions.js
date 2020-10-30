import React from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Text,
  Input,
  Button,
} from "@chakra-ui/core";
import Auth from "../utils/auth";

function ViewQuestions() {
  return (
    <Flex width="full" align="center" justifyContent="center">
      {Auth.loggedIn() ? (
        <div>
          <Box p={8} maxWidth="80%">
            <Box textAlign="center">
              <Heading>Questions</Heading>
            </Box>
            <Box
              my={4}
              textAlign="center"
              p="8"
              borderWidth={1}
              borderRadius={8}
              boxShadow="lg"
            >
            <form>
              <Text>
                How was the latest funding round ?{" "}
              </Text>
              <Button
              type="submit"
              variantColor="purple"
              variant="outline"
              width="25"
              margin="3px"
              mt={4}
              >
                👍
              </Button>
              <Button
              type="submit"
              variantColor="purple"
              variant="outline"
              width="25"
              margin="3px"
              mt={4}
              >
                👎
              </Button>
              <Button
              type="submit"
              variantColor="purple"
              variant="outline"
              width="25"
              margin="3px"
              mt={4}
              >
                Upvotes: 50
              </Button>
            </form>
          </Box>
        </Box>
      </div>
      ) : (
        <div>
          Login to View Dory Questions
        </div>
      )}
    </Flex>
  );
}

export default ViewQuestions;
