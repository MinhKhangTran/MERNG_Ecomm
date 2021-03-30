//Apollo Stuff
import { ApolloProvider } from "@apollo/client";
import withData from "../lib/withData";
//Chakra Stuff
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { theme } from "../styles";
import Layout from "../components/Layout";
//Next Stuff
import Router from "next/router";
//Nprogress
import NProgress from "nprogress";
// import "nprogress/nprogress.css";
import "../styles/nprogress.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

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

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp);
