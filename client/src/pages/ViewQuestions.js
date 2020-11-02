import React from "react";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/react-hooks";
import { ALL_POLLS } from "../utils/queries";
import Question from "../components/Question";
import { Flex, Box, Heading, Spinner } from "@chakra-ui/core";

// Debug enable
const debug = 1;

function ViewQuestions(props) {
  // Poll list logic
  const { loading, data } = useQuery(ALL_POLLS);
  const doryPolls = data?.allPolls || {};
  if (debug) console.log("All Polls:", doryPolls);

  if (loading) {
    return (
      <Flex width="full" align="center" justifyContent="center">
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
            <Spinner size="xl" />
          </Box>
        </Box>
      </Flex>
    );
  }
  return (
    <Flex width="full" align="center" justifyContent="center">
      {Auth.loggedIn() ? (
        <Box p={8} maxWidth="80%">
          <Box textAlign="center">
            <Heading>Questions</Heading>
          </Box>
          {doryPolls &&
            doryPolls.map((doryPoll) => (
              <Question key={doryPoll._id} {...doryPoll} />
            ))}
        </Box>
      ) : (
        <Flex width="full" align="center" justifyContent="center">
          <Box p={8} maxWidth="80%">
            <Box textAlign="center">
              <Heading>Dory Login required to view Questions</Heading>
            </Box>
          </Box>
        </Flex>
      )}
    </Flex>
  );
}
export default ViewQuestions;
