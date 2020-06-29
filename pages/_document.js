import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <title>Shortfy - The easiest to use url shortener</title>
          <meta
            name="description"
            content="Shortfy.ml is a url shortener to reduce long link. Use our tool to Shortfy links and share them."
          />

          <script
            data-ad-client="ca-pub-6005708002042517"
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
