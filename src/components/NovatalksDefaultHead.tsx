import Head from 'next/head';
import React from 'react';

interface Props {
  title: string;
  description?: string;
  imageUrl?: string;
}

export function NovatalksDefaultHead({
  title,
  description,
  imageUrl,
}: Props): JSX.Element {
  const fullTitle = `${title} | Novatalks`;
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta property="og:title" content={fullTitle} key="ogtitle" />

      {/** Primary Meta tags */}
      <meta name="title" content={fullTitle} key="title" />
      {/** Open Graph / Facebook */}
      <meta property="og:title" content={fullTitle} key="ogtitle" />
      {/** Twitter */}
      <meta property="twitter:title" content={fullTitle} key="twittertitle" />

      {description && (
        <>
          {/** Primary Meta tags */}
          <meta name="description" content={description} key="description" />
          {/** Open Graph / Facebook */}
          <meta
            property="og:description"
            content={description}
            key="ogdescription"
          />
          {/** Twitter */}
          <meta
            property="twitter:description"
            content={description}
            key="twitterdescription"
          />
        </>
      )}

      {imageUrl && (
        <>
          {/** Open Graph / Facebook */}
          <meta property="og:image" content={imageUrl} key="ogimage" />
          {/** Twitter */}
          <meta
            property="twitter:image"
            content={imageUrl}
            key="twitterimage"
          />
        </>
      )}
    </Head>
  );
}
