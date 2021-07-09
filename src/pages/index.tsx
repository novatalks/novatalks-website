import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import { DarkMode } from 'use-dark-mode';
import Div100vh from 'react-div-100vh';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { pt } from 'date-fns/locale';
import fmt from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { FiCalendar, FiUser } from 'react-icons/fi';
import styled, { useTheme } from 'styled-components';

import { PaddingContainer, HeaderPadding } from '../assets/DefaultStyles';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ThreeJSAnim from '../components/ThreeJS/ThreeJSAnim';

import {
  getPrismicClient,
  localePathToPrismic,
  rootIPageFromLocale,
  LinkResolver,
} from '../helpers/prismic';
import { PageTypeEnum, IHome, IEventThumb } from '../helpers/interfaces';
import {
  deconstructEventThumb,
  deconstructHome,
} from '../helpers/deconstructors';

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

interface EventPagination {
  next_page: string;
  results: IEventThumb[];
}

interface HomeProps {
  eventsPagination: EventPagination;
  home: IHome;
  darkMode: DarkMode;
}

export default function Home({
  eventsPagination: { next_page, results },
  home,
  darkMode,
}: HomeProps): JSX.Element {
  const theme = useTheme();
  const [events, setEvents] = useState([]);
  const [nextPage, setNextPage] = useState(next_page);

  // trigger refresh when locale changes
  useEffect(() => {
    setEvents(results);
    setNextPage(next_page);
  }, [results, next_page]);

  // fetch more events
  async function handleGetMoreEvents(): Promise<void> {
    const response = await (await fetch(nextPage)).json();
    const newEvents: IEventThumb[] = response.results.map(newEvent =>
      deconstructEventThumb(newEvent, home.page.currentLang)
    );
    setEvents([...events, ...newEvents]);
    setNextPage(response.next_page);
  }

  return (
    <>
      <Head>
        <title>{home.name}</title>
      </Head>

      <Header
        title="Novatalks"
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
          <PaddingContainer>
            {events.map((event: IEventThumb) => (
              <div key={event.page.uid}>
                <LinkResolver page={event}>
                  <a>
                    <strong>{event.name}</strong>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: RichText.asHtml(event.description),
                      }}
                    />
                    <footer>
                      <time>
                        <FiCalendar color="#BBBBBB" size={20} />
                        {fmt(parseISO(event.startTime), 'dd MMM yyyy', {
                          locale: pt,
                        })}
                      </time>
                      <FiUser color="#BBBBBB" size={20} />
                    </footer>
                  </a>
                </LinkResolver>
              </div>
            ))}
            {nextPage && (
              <button type="button" onClick={handleGetMoreEvents}>
                Load more events
              </button>
            )}
          </PaddingContainer>
        </m.main>
      </LazyMotion>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const prismic = getPrismicClient();
  const eventsResponse = await prismic.query(
    Prismic.predicates.at('document.type', PageTypeEnum.Event),
    {
      orderings: '[my.event.starttime desc]',
      fetch: [
        'event.name',
        'event.description',
        'event.image',
        'event.starttime',
        'event.endtime',
      ],
      pageSize: process.env.eventsOnIndex,
      lang: localePathToPrismic(locale),
    }
  );

  const homepageResponse = await prismic.getSingle(PageTypeEnum.RootHome, {
    ref: null,
    lang: localePathToPrismic(locale),
    fetch: 'homepage.title',
  });

  const home: IHome = deconstructHome(homepageResponse, locale);

  const events: IEventThumb[] = eventsResponse.results.map(event =>
    deconstructEventThumb(event, locale)
  );

  return {
    props: {
      eventsPagination: {
        results: events,
        next_page: eventsResponse.next_page,
      },
      home,
    },
  };
};
