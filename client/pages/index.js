import { Box, Heading, Text } from "@chakra-ui/layout";
import Head from "next/head";
import Products from "../components/Products";

export default function Home() {
  return (
    <Box>
      <Head>
        <title>Gönner shop V2</title>
      </Head>
      <Products />
    </Box>
  );
}
