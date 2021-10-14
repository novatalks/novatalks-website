import { GetStaticProps } from 'next';
import Head from 'next/head';

import { RichText } from 'prismic-dom';
import { DarkMode } from 'use-dark-mode';
import Div100vh from 'react-div-100vh';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import styled, { useTheme } from 'styled-components';

import { HeaderPadding } from '../assets/DefaultStyles';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ThreeJSAnim from '../components/ThreeJS/ThreeJSAnim';

import { getPrismicClient, localePathToPrismic } from '../helpers/prismic';
import { PageTypeEnum, IHome } from '../helpers/interfaces';
import { deconstructHome } from '../helpers/deconstructors';

const HeroDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.body};
  height: calc(100% - ${({ theme }) => theme.headerHeight});
  > :first-child {
    position: absolute !important;
    top: 0;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  z-index: 2;
  width: 80%;
  height: 80%;
`;

interface HomeProps {
  home: IHome;
  darkMode: DarkMode;
}

export default function Contacts({ home, darkMode }: HomeProps): JSX.Element {
  const theme = useTheme();

  return (
    <>
      <Head>
        <title>{home.name}</title>
      </Head>

      <Header
        title="Contact"
        pageType={{ page: home.page }}
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
            <HeroDiv>
              <ThreeJSAnim />
              <HeaderContent>
                <h1>{home.name}</h1>
                <p
                  dangerouslySetInnerHTML={{
                    __html: RichText.asHtml(home.description),
                  }}
                />
              </HeaderContent>
            </HeroDiv>
          </Div100vh>
        </m.main>
      </LazyMotion>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const prismic = getPrismicClient();

  const homepageResponse = await prismic.getSingle(PageTypeEnum.RootHome, {
    ref: null,
    lang: localePathToPrismic(locale),
    fetch: 'homepage.title',
  });

  const home: IHome = deconstructHome(homepageResponse, locale);

  return {
    props: {
      home,
    },
  };
};
