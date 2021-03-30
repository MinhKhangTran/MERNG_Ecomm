import { useMutation, useQuery } from "@apollo/client";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  Flex,
  Grid,
  Heading,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import gql from "graphql-tag";
import formatMoney from "../lib/formatMoney";
import { useRouter } from "next/router";
import Head from "next/head";

const FETCH_SINGLE_PRODUCT_QUERY = gql`
  query FETCH_SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
      photo {
        photo {
          publicUrlTransformed
        }
      }
    }
  }
`;

const SingleProduct = ({ id }) => {
  const router = useRouter();
  const { loading, error, data } = useQuery(FETCH_SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });

  if (error)
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Es gab ein Fehler 🥲</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
        <CloseButton position="absolute" right="8px" top="8px" />
      </Alert>
    );

  if (loading) return <Spinner color="blue.600" />;
  return (
    <Box mt={8}>
      <Head>
        <title>Gönner Shop | {data.Product.name}</title>
      </Head>
      <Button
        colorScheme="blue"
        variant="solid"
        onClick={() => router.push("/")}
      >
        🔙 Zurück zu den Produckten
      </Button>
      <Heading>{data.Product.name}</Heading>
      <Grid
        mt={8}
        templateColumns={{ base: "repeat(1,1fr)", md: "repeat(2,1fr)" }}
      >
        <Box>
          <Image
            border="8px"
            borderColor="blue.400"
            boxSize="xl"
            objectFit="cover"
            src={data.Product.photo.photo.publicUrlTransformed}
            alt={data.Product.name}
          ></Image>
        </Box>
        <Box fontSize="xl">
          <Text>{data.Product.description}</Text>
          <Heading mt={4}>Preis: {formatMoney(data.Product.price)}</Heading>
        </Box>
      </Grid>
    </Box>
  );
};

export default SingleProduct;
