import React from 'react';
import {
    Flex,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Text,
    Input,
    Button
  } from '@chakra-ui/core';

  

  export default function ViewQuestions() {
    return (
      <Flex width="full" align="center" justifyContent="center">
        <Box p={8} maxWidth="80%">
        <Box textAlign="center">
          <Heading>Questions</Heading>
          </Box>
          <Box my={4} textAlign="center" p="8" borderWidth={1} borderRadius={8} boxShadow="lg">
            <form>
              <Text>Recently our board of investors went on a strategic retreat to Martha's Vineyard.  What did they discuss there, and how will it impact the company? </Text>
              <Button type="submit" variantColor="purple" variant="outline" width="25" margin="3px" mt={4}>
                👍
              </Button>
              <Button type="submit" variantColor="purple" variant="outline" width="25" margin="3px" mt={4}>
                👎
              </Button>
              <Button type="submit" variantColor="purple" variant="outline" width="25" margin="3px" mt={4}>
                Upvotes: 50
              </Button>
            </form>
          </Box>

{/* Example Box #2 */}

          <Box my={4} textAlign="center" p="8" borderWidth={1} borderRadius={8} boxShadow="lg">
            <form>
              <Text>Our company doesn't have delicious lunches every day, they only have them most days.  Is there plans to increase the rate of lunch deliciousness going forward? </Text>
              <Button type="submit" variantColor="purple" variant="outline" width="25" margin="3px" mt={4}>
                👍
              </Button>
              <Button type="submit" variantColor="purple" variant="outline" width="25" margin="3px" mt={4}>
                👎
              </Button>
              <Button type="submit" variantColor="purple" variant="outline" width="25" margin="3px" mt={4}>
                Count: 27
              </Button>
            </form>
          </Box>        

          {/* Example Box #3 */}  

          <Box my={4} textAlign="center" p="8" borderWidth={1} borderRadius={8} boxShadow="lg">
            <form>
              <Text>Why was I not invited to Martha's vineyard?
                 </Text>
              <Button type="submit" variantColor="purple" variant="outline" width="25" margin="3px" mt={4}>
                👍
              </Button>
              <Button type="submit" variantColor="purple" variant="outline" width="25" margin="3px" mt={4}>
                👎
              </Button>
              <Button type="submit" variantColor="purple" variant="outline" width="25" margin="3px" mt={4}>
                Count: 4
              </Button>
            </form>
          </Box> 

          {/* Example Box #3 */}  

          <Box my={4} textAlign="center" p="8" borderWidth={1} borderRadius={8} boxShadow="lg">
            <form>
              <Text>This company sucksssss!  You all suck and are bad!!
                 </Text>
              <Button type="submit" variantColor="purple" variant="outline" width="25" margin="3px" mt={4}>
                👍
              </Button>
              <Button type="submit" variantColor="purple" variant="outline" width="25" margin="3px" mt={4}>
                👎
              </Button>
              <Button type="submit" variantColor="purple" variant="outline" width="25" margin="3px" mt={4}>
                Count: - 4,254
              </Button>
            </form>
          </Box> 

        </Box>
      </Flex>
    );
  }
