import React, { useState } from "react";
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
import { useMutation, useQuery } from "@apollo/react-hooks";
import { ALL_POLLS } from "../utils/queries";
import { LIKE, DISLIKE } from "../utils/mutations";
// Debug enable
const debug = 1;

function ViewQuestions() {
  const [formState, setFormState] = useState({ count: "" });
  const { loading, data } = useQuery(ALL_POLLS);
  const doryPolls = data?.allPolls || {};
  if(debug) console.log("All Polls:",doryPolls);
  if (loading) {
    return <div>Loading...</div>;
  }
  //if(debug) console.log("All Polls2:",doryPolls[0].question);

  // Poll list logic
  // const refreshPolls = async (event) => {
  //   event.preventDefault();
  //   try {
  //     //const doryPolls = await allPolls();
  //     const { loading, data: doryPolls } = useQuery(ALL_POLLS);
  //     if(debug) console.log("All Polls:",doryPolls);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // // Like logic
  // const [addLike] = useMutation(LIKE);
  // const [addDislike] = useMutation(DISLIKE);

  // const handleLike = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const mutationResponse = await addLike({
  //       variables: { question: formState.question },
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // const handleDislike = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const mutationResponse = await addDislike({
  //       variables: { question: formState.question },
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
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
        <div>
          <Box p={8} maxWidth="80%">
            <Box textAlign="center">
              <Heading>Questions</Heading>
            </Box>
            {doryPolls && doryPolls.map(doryPolls => (
            <div key={doryPolls._id} >
            <Box
              my={4}
              textAlign="center"
              p="8"
              borderWidth={1}
              borderRadius={8}
              boxShadow="lg"
            >
              <form>
                <Text>{doryPolls.question}</Text>
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
                  Upvotes: {doryPolls.count} 
                </Button>
              </form>
            </Box>
            </div>
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
