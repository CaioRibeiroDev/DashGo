import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({showProfileData = true}: ProfileProps) {
  return (
  <Flex align="center">
    { showProfileData && (
      <Box mr="4" textAlign="right" >
      <Text>Caio Ribeiro</Text>
      <Text color="gray.300" fontSize="small">caioribeirodev@gmail.com</Text>
    </Box>
    ) }

    <Avatar size="md" name="Caio Ribeiro" src="https://github.com/caioribeirodev.png"/>
  </Flex>
  )
}