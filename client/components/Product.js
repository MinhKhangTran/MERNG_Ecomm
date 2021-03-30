import { Badge, Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import formatMoney from "../lib/formatMoney";
import Link from "next/link";

const Product = ({ name, photo, description, price, id }) => {
  return (
    <Box
      position="relative"
      border="2px"
      borderRadius="lg"
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
      {/* <Flex justify="center" align="center" direction="column"> */}
      <Image
        borderTopRadius="lg"
        objectFit="cover"
        alt={name}
        src={photo.photo?.publicUrlTransformed}
      ></Image>

      {/* </Flex> */}
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
      <Text fontSize="lg" my={4} px={4}>
        {description}
      </Text>
    </Box>
  );
};

export default Product;
