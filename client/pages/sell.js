import { useMutation } from "@apollo/client";
import {
  Input,
  Box,
  Heading,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import gql from "graphql-tag";
import { useState } from "react";
import * as Yup from "yup";
import Router from "next/router";

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $description: String!
    $photo: Upload
    $price: Int!
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        photo: { create: { photo: $photo, alt: $name } }
        price: $price
      }
    ) {
      id
      description
      name
      price
    }
  }
`;

const SellPage = () => {
  //for image uploading
  const [bild, setBild] = useState("");
  function handleChange(e) {
    setBild(e.target.files);
  }
  const formik = useFormik({
    initialValues: { name: "", description: "", price: 0 },
    validationSchema: Yup.object({
      name: Yup.string().required("Erforderlich ❌"),
      description: Yup.string().required("Erforderlich ❌"),
      price: Yup.number().required("Erforderlich ❌"),
    }),
    onSubmit: async (daten, { resetForm }) => {
      console.log({
        name: formik.values.name,
        description: formik.values.description,
        price: formik.values.price,
        photo: bild,
      });
      const res = await createProduct();
      // console.log(res);
      Router.push({
        pathname: `/product/${res.data.createProduct.id}`,
      });

      resetForm();
    },
  });
  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: {
        name: formik.values.name,
        description: formik.values.description,
        price: formik.values.price,
        photo: bild,
      },
    }
  );

  return (
    <Box w={{ base: "90%", md: "65%" }} mx="auto">
      <Heading mt={6} color="blue.500">
        Verkaufen
      </Heading>
      <Text mb={6}>Hier kannst du deine Lebensmittel verkaufen!</Text>
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
          {/* Image */}
          <FormControl mt={2}>
            <FormLabel color="blue.400">Bild</FormLabel>
            <Input
              isRequired
              type="file"
              name="bild"
              id="bild"
              onChange={(e) => {
                // console.log(e.target.files[0]);
                setBild(e.target.files[0]);
              }}
              // onChange={handleChange}
            ></Input>
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
          <Button isLoading={loading} type="submit" mt={10} colorScheme="blue">
            Produkt hinzufügen
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default SellPage;
