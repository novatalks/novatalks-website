import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import { DarkMode } from 'use-dark-mode';
import styled from 'styled-components';

import Prismic from '@prismicio/client';
import { pt } from 'date-fns/locale';
import fmt from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { FiCalendar, FiUser } from 'react-icons/fi';
import Head from 'next/head';
import { RichText } from 'prismic-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { PaddingContainer, HeaderPadding } from '../assets/DefaultStyles';

import {
  getPrismicClient,
  localePathToPrismic,
  rootIPageFromLocale,
  LinkResolver,
} from '../helpers/prismic';
import { PageTypeEnum, IPage, ISpeaker } from '../helpers/interfaces';
import { deconstructSpeaker } from '../helpers/deconstructors';
import { PersonCard } from '../components/Cards/PersonCard';
import { SquareButton } from '../components/SquareButton';

const CardsDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  min-height: 70vh;
  gap: 10px;
  > * {
    flex: 1 0 calc(10px - 30%); /*grow | shrink | basis */
    margin: 0;
  }
`;
interface SpeakersPagination {
  next_page: string;
  results: ISpeaker[];
}

interface Props {
  speakersPagination: SpeakersPagination;
  pageType: IPage;
  darkMode: DarkMode;
}

export default function Speakers({
  speakersPagination: { next_page, results },
  pageType,
  darkMode,
}: Props): JSX.Element {
  const [speakers, setSpeakers] = useState([]);
  const [nextPage, setNextPage] = useState(next_page);

  // trigger refresh when locale changes
  useEffect(() => {
    setSpeakers(results);
    setNextPage(next_page);
  }, [results, next_page]);

  // fetch more events
  async function handleGetMoreSpeakers(): Promise<void> {
    const response = await (await fetch(nextPage)).json();
    const newSpeakers: ISpeaker[] = response.results.map(newSpeaker =>
      deconstructSpeaker(newSpeaker, pageType.page.currentLang)
    );
    setSpeakers([...speakers, ...newSpeakers]);
    setNextPage(response.next_page);
  }

  return (
    <>
      <Head>
        <title>Speakers | Novatalks</title>
      </Head>

      <Header title="Novatalks" pageType={pageType} darkMode={darkMode} />
      <HeaderPadding />

      <PaddingContainer>
        <main>
          {/* speakers.map((speaker: ISpeaker) => (
            <div key={speaker.page.uid}>
              <LinkResolver page={speaker}>
                <a>
                  <strong>{speaker.name}</strong>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: RichText.asHtml(speaker.description),
                    }}
                  />
                  <footer>
                    <time>
                      <FiCalendar color="#BBBBBB" size={20} />
                      {fmt(
                        parseISO(speaker.page.first_publication_date),
                        'dd MMM yyyy',
                        {
                          locale: pt,
                        }
                      )}
                    </time>
                  </footer>
                </a>
              </LinkResolver>
            </div>
                      )) */}
          <CardsDiv>
            {speakers.map((speaker: ISpeaker) => (
              <PersonCard person={speaker}>
                {pageType.page.currentLang === 'en' && (
                  <LinkResolver page={speaker}>
                    <SquareButton title="See more" target="" />
                  </LinkResolver>
                )}
                {pageType.page.currentLang === 'pt' && (
                  <LinkResolver page={speaker}>
                    <SquareButton title="Ver mais" target="" />
                  </LinkResolver>
                )}
              </PersonCard>
            ))}
          </CardsDiv>
          {nextPage && (
            <button type="button" onClick={handleGetMoreSpeakers}>
              Load more Speakers
            </button>
          )}
        </main>
      </PaddingContainer>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const prismic = getPrismicClient();
  const speakersResponse = await prismic.query(
    Prismic.predicates.at('document.type', PageTypeEnum.Speaker),
    {
      // fetch: ['speaker.name', 'speaker.description'],
      pageSize: process.env.eventsOnIndex,
      lang: localePathToPrismic(locale),
    }
  );

  const speakers: ISpeaker[] = speakersResponse.results.map(speaker =>
    deconstructSpeaker(speaker, locale)
  );

  const pageType = rootIPageFromLocale(locale, PageTypeEnum.RootSpeakers);

  return {
    props: {
      speakersPagination: {
        results: speakers,
        next_page: speakersResponse.next_page,
      },
      pageType,
    },
  };
};
