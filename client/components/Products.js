import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
  Grid,
  Heading,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Product from "./Product";

export const FETCH_PRODUCTS_QUERY = gql`
  query {
    allProducts {
      id
      name
      price
      description
      photo {
        photo {
          publicUrlTransformed
        }
      }
    }
  }
`;

const Products = () => {
  const { error, loading, data } = useQuery(FETCH_PRODUCTS_QUERY);

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
    <Grid
      mt={8}
      templateColumns={{ base: "repeat(1,1fr)", md: "repeat(3,1fr)" }}
      gap={6}
    >
      {data?.allProducts.map((product) => {
        return <Product key={product.id} {...product} />;
      })}
    </Grid>
  );
};

export default Products;
