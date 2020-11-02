import React from "react";
import Auth from "../utils/auth";
import { useColorMode, Button, Link, Box, IconButton } from "@chakra-ui/core";

export default function ThemeToggler() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box textAlign="right" py={4} mr={12}>
      {Auth.loggedIn() ? (
        <Box textAlign="right" py={4} mr={12}>
          <Link margin="20px" fontWeight="bold" href="/dory">
            Dory
          </Link>
          <Link margin="20px" fontWeight="bold" href="/createquestion">
            Post
          </Link>
          <Link margin="20px" fontWeight="bold" onClick={() => Auth.logout()}>
            Logout
          </Link>
          <IconButton
          icon={colorMode === "light" ? "moon" : "sun"}
          onClick={toggleColorMode}
          variant="ghost"
          fontWeight="semibold"
          margin="2px"
        />
        </Box>
      ) : (
        <Box textAlign="right" py={4} mr={12}>
          <Link margin="20px" fontWeight="bold" href="/">
            Login
          </Link>
          <Link margin="20px" fontWeight="bold" href="/signup">
            Signup
          </Link>
          <IconButton
          icon={colorMode === "light" ? "moon" : "sun"}
          onClick={toggleColorMode}
          variant="ghost"
          fontWeight="semibold"
          margin="2px"
        />
        </Box>
      )}
    </Box>
  );
}
