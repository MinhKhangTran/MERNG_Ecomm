import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import formatMoney from "../lib/formatMoney";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

//evicting/update after deleting

function update(cache, payload) {
  // console.log(payload);
  // console.log("running the update function after delete");
  cache.evict(cache.identify(payload.data.deleteProduct));
}
const Product = ({ name, photo, description, price, id }) => {
  const [
    deleteProduct,
    { loading, error },
  ] = useMutation(DELETE_PRODUCT_MUTATION, { variables: { id }, update });
  return (
    <Flex
      direction="column"
      position="relative"
      border="2px"
      borderRadius="lg"
      justifyContent="space-between"
      _hover={{ boxShadow: "lg" }}
    >
      <Heading
        position="absolute"
        top="230px"
        left="50%"
        transform="translateX(-50%)"
        bg="blue.100"
        p={2}
        whiteSpace="nowrap"
        _hover={{ background: "blue.500" }}
      >
        <Link href={`/product/${id}`}>{name}</Link>
      </Heading>
      <Box
        position="absolute"
        bg="blue.500"
        color="blue.100"
        display="inline"
        py="0.25rem"
        px="0.6rem"
        borderRadius="md"
        top="2%"
        left="5%"
        transform="rotate(-20deg)"
      >
        <Heading fontSize="4xl">{formatMoney(price)}</Heading>
      </Box>
      {/* <Flex justify="center" align="center" direction="column"> */}

      <Image
        borderTopRadius="lg"
        objectFit="cover"
        alt={name}
        src={photo.photo?.publicUrlTransformed}
      ></Image>

      {/* </Flex> */}

      <Text justifyItems="normal" fontSize="lg" my={4} px={4}>
        {description}
      </Text>
      <ButtonGroup borderTop="2px" justifyItems="end">
        <Button borderRadius="none" borderRight="2px">
          <Link
            href={{
              pathname: "/update",
              query: {
                id: id,
              },
            }}
          >
            Ändern ✍️
          </Link>
        </Button>
        <button
          style={{ fontWeight: "bold" }}
          className="snipcart-add-item"
          data-item-id={id}
          data-item-price={price / 100}
          data-item-url="/"
          data-item-description={description}
          data-item-image={photo.photo?.publicUrlTransformed}
          data-item-name={name}
        >
          In den Warenkorb 🛍
        </button>
        {/* <Button borderLeft="2px" borderRadius="none">
          In den Warenkorb 🛍
        </Button> */}
        <Button
          isLoading={loading}
          borderLeft="2px"
          borderRadius="none"
          onClick={() => {
            if (confirm("Bist du dir sicher?")) {
              deleteProduct().catch((err) => alert(err.message));
            }
          }}
        >
          Löschen 🙅‍♂️
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export default Product;
