import { Box, Heading, Text } from "@chakra-ui/layout";
import Head from "next/head";

export default function Home() {
  return (
    <Box>
      <Head>
        <title>Gönner shop V2</title>
      </Head>
      <Heading bg="blue.400">New Tegomi</Heading>
      <Text bg="blue.400">Roboto</Text>
    </Box>
  );
}
