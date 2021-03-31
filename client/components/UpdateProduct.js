import { useMutation, useQuery } from "@apollo/client";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import gql from "graphql-tag";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { FETCH_SINGLE_PRODUCT_QUERY } from "./SingleProduct";

//Mutation for update
const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

const UpdateProduct = ({ id }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
  });
  const { error, loading, data } = useQuery(FETCH_SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });
  const [
    updateProduct,
    { loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);
  useEffect(() => {
    if (data) {
      // console.log(data);
      setFormData({
        name: data.Product.name,
        description: data.Product.description,
        price: Number(data.Product.price),
      });
    }
  }, [data]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: Yup.object({
      name: Yup.string().required("Erforderlich ❌"),
      description: Yup.string().required("Erforderlich ❌"),
      price: Yup.number().required("Erforderlich ❌"),
    }),
    onSubmit: async (daten, { resetForm }) => {
      // console.log(daten);
      const res = await updateProduct({
        variables: {
          id,
          name: daten.name,
          description: daten.description,
          price: daten.price,
        },
      }).catch((err) => console.log(err));

      // console.log(res);
      router.back();
    },
  });

  if (loading) return <Spinner />;
  return (
    <Box w={{ base: "90%", md: "65%" }} mx="auto">
      <Heading mt={6} color="blue.500">
        Änderungen
      </Heading>
      <Text mb={6}>
        Hier kannst du <Text as="i">{data?.Product.name}</Text> ändern!
      </Text>
      <Box border="2px" borderColor="blue.400" p={8} boxShadow="lg">
        <form onSubmit={formik.handleSubmit}>
          {/* name */}
          <FormControl isInvalid={!!formik.errors.name && formik.touched.name}>
            <FormLabel color="blue.400">Name</FormLabel>
            <Input
              type="text"
              placeholder="Name deines Produktes"
              {...formik.getFieldProps("name")}
            ></Input>
            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
          </FormControl>
          {/* description */}
          <FormControl
            mt={2}
            isInvalid={
              !!formik.errors.description && formik.touched.description
            }
          >
            <FormLabel color="blue.400">Beschreibung</FormLabel>
            <Textarea
              placeholder="Beschreibung deines Produktes"
              {...formik.getFieldProps("description")}
            ></Textarea>
            <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
          </FormControl>

          {/* Preis */}
          <FormControl
            mt={2}
            isInvalid={!!formik.errors.price && formik.touched.price}
          >
            <FormLabel color="blue.400">Preis</FormLabel>
            <Input
              type="number"
              placeholder="Peis deines Produktes"
              {...formik.getFieldProps("price")}
            ></Input>
            <FormErrorMessage>{formik.errors.price}</FormErrorMessage>
          </FormControl>
          <Button type="submit" mt={10} colorScheme="blue">
            Produkt ändern
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default UpdateProduct;
