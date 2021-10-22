import { Flex, Text, Box, Avatar } from "@chakra-ui/react";

export function Profile(): JSX.Element {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Marcos V. Pereira</Text>
        <Text color="gray.300" fontSize="small">
          vinicius.hein@gmail.com
        </Text>
      </Box>

      <Avatar size="md" name="Marcos V. Pereira" src="https://github.com/marcos-hein.png" />
    </Flex>
  );
}
