import Document, { Html, Head, Main, NextScript } from 'next/document';
import Favicon from '../components/Favicon';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <Favicon />
          <script
            async
            defer
            src="https://static.cdn.prismic.io/prismic.js?new=true&repo=novatalks-new"
          />
          <link
            rel="preconnect"
            href="https://fonts.googleapis.com"
            crossOrigin="anonymous"
          />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans&family=Raleway:ital,wght@0,300;0,400;0,600;0,700;1,200;1,400&display=swap"
            rel="stylesheet"
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
