import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import { RichText } from 'prismic-dom';
import { DarkMode } from 'use-dark-mode';
import Div100vh from 'react-div-100vh';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import styled, { useTheme } from 'styled-components';

import { HeaderPadding, PaddingContainer } from '../assets/DefaultStyles';

import Header from '../components/Header';
import Footer from '../components/Footer';

import { getPrismicClient, localePathToPrismic } from '../helpers/prismic';
import { PageTypeEnum, IPodcast } from '../helpers/interfaces';
import { deconstructPodcast } from '../helpers/deconstructors';
import {
  HeaderContent,
  HeaderImg,
  HeaderImgContent,
} from '../components/Cards/HeaderImgContent';

interface PodcastProps {
  podcast: IPodcast;
  darkMode: DarkMode;
}

export default function Podcast({
  podcast,
  darkMode,
}: PodcastProps): JSX.Element {
  const theme = useTheme();

  return (
    <>
      <Head>
        <title>{podcast.name}</title>
      </Head>

      <Header
        title="Contact"
        pageType={{ page: podcast.page }}
        darkMode={darkMode}
      />

      <LazyMotion features={domAnimation}>
        <m.main
          variants={theme.variants} // Pass the variant object into Framer Motion
          initial="hidden" // Set the initial state to variants.hidden
          animate="enter" // Animated state to variants.enter
          exit="exit" // Exit state (used later) to variants.exit
          transition={{ type: 'linear' }} // Set the transition to linear
          className=""
        >
          <Div100vh>
            <HeaderPadding />
            <HeaderImgContent>
              <HeaderContent>
                <h1>{podcast.name}</h1>
                <p
                  dangerouslySetInnerHTML={{
                    __html: RichText.asHtml(podcast.description),
                  }}
                />
              </HeaderContent>
              <HeaderImg>
                <Image
                  src={podcast.image.url}
                  alt={`${podcast.name} header image`}
                  layout="fill"
                  objectFit="contain"
                />
              </HeaderImg>
            </HeaderImgContent>
            <PaddingContainer>
              <iframe
                title="Spotify Embed"
                src={podcast.spotifyLink}
                width="100%"
                height="232"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              />
            </PaddingContainer>
          </Div100vh>
        </m.main>
      </LazyMotion>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const prismic = getPrismicClient();

  const homepageResponse = await prismic.getSingle(PageTypeEnum.RootPodcast, {
    ref: null,
    lang: localePathToPrismic(locale),
    fetch: 'homepage.title',
  });

  const podcast: IPodcast = deconstructPodcast(homepageResponse, locale);

  return {
    props: {
      podcast,
    },
  };
};
