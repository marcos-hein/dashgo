import { Flex, Text, Box, Avatar } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps): JSX.Element {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Marcos V. Pereira</Text>
          <Text color="gray.300" fontSize="small">
            vinicius.hein@gmail.com
          </Text>
        </Box>
      )}

      <Avatar size="md" name="Marcos V. Pereira" src="https://github.com/marcos-hein.png" />
    </Flex>
  );
}
