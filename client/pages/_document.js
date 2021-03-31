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
          {/* Snipcart */}
          <link rel="preconnect" href="https://app.snipcart.com" />
          <link rel="preconnect" href="https://cdn.snipcart.com" />
          <link
            rel="stylesheet"
            href="https://cdn.snipcart.com/themes/v3.0.31/default/snipcart.css"
          />
        </Head>
        <body>
          <ColorModeScript />
          <Main></Main>
          <NextScript></NextScript>
        </body>
        <script
          async
          src="https://cdn.snipcart.com/themes/v3.0.31/default/snipcart.js"
        ></script>
        <div
          hidden
          id="snipcart"
          data-api-key="MGI4M2NjOWUtODgxNi00NTcwLTk1NTktYjg5Yzg2YzM2ZmRjNjM3NDIwODcyMTMzNDk3MDIw"
        ></div>
      </Html>
    );
  }
}
export default MyDocument;
