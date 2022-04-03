import { GetStaticProps } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import { DarkMode } from 'use-dark-mode';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import styled, { useTheme } from 'styled-components';

import { PaddingContainer, HeaderPadding } from '../assets/DefaultStyles';

import Header from '../components/Header';
import Footer from '../components/Footer';

import { getPrismicClient, localePathToPrismic } from '../helpers/prismic';
import { PageTypeEnum, IHome, IEventThumb } from '../helpers/interfaces';
import {
  deconstructEventThumb,
  deconstructHome,
} from '../helpers/deconstructors';
import { EventCardWrapper } from '../components/Cards/EventCardWrapper';

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
          <HeaderPadding />
          <PaddingContainer>
            <h1>{home.name}</h1>
            <p
              dangerouslySetInnerHTML={{
                __html: RichText.asHtml(home.description),
              }}
            />
          </PaddingContainer>
          <EventCardWrapper events={events} />
          {nextPage && home.page.currentLang === 'en' && (
            <button type="button" onClick={handleGetMoreEvents}>
              Load more events
            </button>
          )}
          {nextPage && home.page.currentLang === 'pt' && (
            <button type="button" onClick={handleGetMoreEvents}>
              Mais eventos
            </button>
          )}
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
