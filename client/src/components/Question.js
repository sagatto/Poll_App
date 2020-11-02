import React from "react";
import { Box, Text, Button } from "@chakra-ui/core";
import { LIKE, DISLIKE } from "../utils/mutations";
import { useMutation } from "@apollo/react-hooks";

//Debug enable
const debug = 0;
export default function Question({ _id, question, count = 0 }) {
  const [addLike] = useMutation(LIKE);
  const handleLike = async (e) => {
    e.preventDefault();
    if (debug) console.log("HANDLE LIKE");
    const mutationResponse = await addLike({ variables: { _id } }).catch(
      (err) => {
        console.log("ERROR=>", err);
      }
    );
    if (debug) console.log("MUTATION RESPONSE=>", mutationResponse);
  };
  const [addDislike] = useMutation(DISLIKE);
  const handleDislike = async (e) => {
    e.preventDefault();
    if (debug) console.log("HANDLE LIKE");
    const mutationResponse = await addDislike({ variables: { _id } }).catch(
      (err) => {
        console.log("ERROR=>", err);
      }
    );
    if (debug) console.log("MUTATION RESPONSE=>", mutationResponse);
  };
  return (
    <Box
      my={4}
      textAlign="center"
      p="8"
      borderWidth={1}
      borderRadius={8}
      boxShadow="lg"
    >
      <form>
        <Text>{question}</Text>
        <Button
          type="submit"
          variantColor="purple"
          variant="outline"
          width="25"
          margin="3px"
          mt={4}
          onClick={(e) => handleLike(e)}
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
          onClick={(e) => handleDislike(e)}
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
          Upvotes: {count}
        </Button>
      </form>
    </Box>
  );
}
