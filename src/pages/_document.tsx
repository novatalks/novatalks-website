import Document, { Html, Head, Main, NextScript } from 'next/document';
import Favicon from '../components/Favicon';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/** Primary Meta tags */}
          <title>Novatalks</title>
          <meta name="title" content="Novatalks" key="title" />
          <meta
            name="description"
            content="Welcome to Nova's student club for talks, workshops and events!"
            key="description"
          />

          {/** Open Graph / Facebook */}
          <meta property="og:type" content="website" key="ogtype" />
          <meta property="og:title" content="Novatalks" key="ogtitle" />
          <meta
            property="og:description"
            content="Welcome to Nova's student club for talks, workshops and events!"
            key="ogdescription"
          />
          <meta property="og:image" content="/images/logo.jpg" key="ogimage" />

          {/** Twitter */}
          <meta
            property="twitter:card"
            content="summary_large_image"
            key="twittercard"
          />
          <meta
            property="twitter:title"
            content="Novatalks"
            key="twittertitle"
          />
          <meta
            property="twitter:description"
            content="Welcome to Nova's student club for talks, workshops and events!"
            key="twitterdescription"
          />
          <meta
            property="twitter:image"
            content="/images/logo.jpg"
            key="twitterimage"
          />

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
