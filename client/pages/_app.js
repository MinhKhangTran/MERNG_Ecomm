//Apollo Stuff
import { ApolloProvider } from "@apollo/client";
import withData from "../lib/withData";
//Chakra Stuff
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { theme } from "../styles";
import Layout from "../components/Layout";

//Nprogress

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ColorModeProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default withData(MyApp);
