import { Badge, Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import formatMoney from "../lib/formatMoney";

const Product = ({ name, photo, description, price }) => {
  return (
    <Box position="relative" p={5}>
      <Heading
        position="absolute"
        top="300px"
        left="50%"
        transform="translateX(-50%)"
        bg="blue.100"
        p={2}
        whiteSpace="nowrap"
      >
        {name}
      </Heading>
      <Flex justify="center" align="center" direction="column">
        <Image
          boxSize="350"
          objectFit="cover"
          alt={name}
          src={photo.photo.publicUrlTransformed}
        ></Image>
        {/* <Text mt={6}>{description}</Text> */}
      </Flex>
      <Box
        position="absolute"
        bg="blue.100"
        color="blue.500"
        display="inline"
        py="0.25rem"
        px="0.6rem"
        borderRadius="md"
        top="5%"
        left="10%"
        transform="rotate(-20deg)"
      >
        <Text fontSize="3xl">{formatMoney(price)}</Text>
      </Box>
    </Box>
  );
};

export default Product;
