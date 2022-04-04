import { GetStaticProps } from 'next';
import Head from 'next/head';

import { DarkMode } from 'use-dark-mode';
import Div100vh from 'react-div-100vh';
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
interface HomeProps {
  home: IHome;
  darkMode: DarkMode;
}

export default function Contacts({ home, darkMode }: HomeProps): JSX.Element {
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

      <Div100vh>
        <HeaderPadding />
        <HeroDiv>
          <ThreeJSAnim />
        </HeroDiv>
      </Div100vh>
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
