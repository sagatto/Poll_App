import React from "react";
import { useColorMode, Button, Link, Box, IconButton } from "@chakra-ui/core";
import Auth from "../utils/auth";

export default function ThemeToggler() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box textAlign="right" py={4} mr={12}>
      <Link margin="2px" fontWeight="semibold" href="/">
        Dory
      </Link>
      <Link margin="2px" fontWeight="semibold" href="/createquestion">
        Question
      </Link>
      {Auth.loggedIn() ? (
        <Button onClick={() => Auth.logout()}>Logout</Button>
      ) : (
        <div>
          <Link margin="2px" fontWeight="semibold" href="/login">
            Login
          </Link>
          <Link margin="2px" fontWeight="semibold" href="/signup">
            SignUp
          </Link>
        </div>
      )}
      <IconButton
        icon={colorMode === "light" ? "moon" : "sun"}
        onClick={toggleColorMode}
        variant="ghost"
        fontWeight="semibold"
        margin="2px"
      />
    </Box>
  );
}
