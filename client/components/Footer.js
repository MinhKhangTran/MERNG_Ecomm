import { Box, Flex, Text } from "@chakra-ui/layout";

const Footer = () => {
  return (
    <Box as="footer" mb={2} mt={6}>
      <Flex justifyContent="center" align="center">
        <Text color="blue.200" fontSize="xl">
          Made with 💙 by MKT, {new Date().getFullYear()}
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
