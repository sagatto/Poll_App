import React from "react";
import {
  Flex,
  Box,
  Heading,
} from "@chakra-ui/core";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/react-hooks";
import { ALL_POLLS } from "../utils/queries";
import Question from "../components/Question";
// Debug enable
const debug = 0;

function ViewQuestions(props) {
  // Poll list logic
  const { loading, data } = useQuery(ALL_POLLS);
  const doryPolls = data?.allPolls || {};
  if(debug) console.log("All Polls:",doryPolls);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Flex width="full" align="center" justifyContent="center">
      {Auth.loggedIn() ? (
        <div>
          <Box p={8} maxWidth="80%">
            <Box textAlign="center">
              <Heading>Questions</Heading>
            </Box>
            {doryPolls && doryPolls.map(doryPoll => (
            <Question key={doryPoll._id}{...doryPoll}/>
          ))}
        </Box>
        </div>
      ) : (
        <div>Login to View Dory Questions</div>
      )}
    </Flex>
  );
}
export default ViewQuestions;