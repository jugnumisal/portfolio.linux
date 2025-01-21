// pages/_document.js

import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {<meta name="google-site-verification" content="Kxta1Fqw97vOm4Y3QeWo0lvt4R8EbpbpjKT5BxdoETM" />}
          <meta
            name="google-site-verification"
            content="your-verification-code"
          />
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
