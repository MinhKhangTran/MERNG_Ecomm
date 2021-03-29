import { ColorModeScript } from "@chakra-ui/color-mode";
import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="de">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=New+Tegomin&family=Roboto&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <ColorModeScript />
          <Main></Main>
          <NextScript></NextScript>
        </body>
      </Html>
    );
  }
}
export default MyDocument;
