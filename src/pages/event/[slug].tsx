import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';

import { DarkMode } from 'use-dark-mode';

import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { RiFacebookLine, RiVideoLine } from 'react-icons/ri';
import styled from 'styled-components';

import {
  PaddingContainer,
  HeaderPadding,
  Inverted,
} from '../../assets/DefaultStyles';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { SquareButton } from '../../components/SquareButton';
import { EventTime } from '../../components/EventTime';
import { SpeakerCardWrapper } from '../../components/Cards/SpeakerCardWrapper';

import {
  getPrismicClient,
  LinkResolver,
  localePathToPrismic,
  getRepetitiveStaticPaths,
  getDocsByIDs,
  getDocByID,
} from '../../helpers/prismic';
import {
  IBasePage,
  IEvent,
  ISpeaker,
  PageTypeEnum,
} from '../../helpers/interfaces';
import {
  deconstructEvent,
  deconstructIBasePage,
  deconstructSpeaker,
} from '../../helpers/deconstructors';
import { formattedDateTime } from '../../helpers/utils';
import {
  HeaderContent,
  HeaderImg,
  HeaderImgContent,
} from '../../components/Cards/HeaderImgContent';

const EventHeaderShare = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: end;

  svg {
    margin-right: 10px;
  }
`;

const EventArticle = styled.article`
  padding-bottom: 3rem;

  h1 {
    font-weight: 300;
    text-align: center;
  }

  section {
    margin: 2rem 0 2rem 0;
    h2 {
      font-weight: 400;
      margin-bottom: 1rem;
    }
  }

  footer {
    margin-top: 1rem;

    display: flex;
    align-items: center;
    font-size: 0.875rem;

    time {
      display: flex;
      align-items: center;
      color: ${({ theme }) => theme.colorInfo};
      font: 300 1.4rem 'Raleway', sans-serif;
      color: gray;

      & + svg {
        margin-left: 1rem;
      }
    }

    span {
      display: block;
      color: ${({ theme }) => theme.colorInfo};
      & + svg {
        margin-left: 1rem;
      }
    }

    svg {
      margin-right: 0.5rem;
    }
  }
`;

const LastEditSpan = styled.span`
  display: block;
  margin-top: 1rem;

  font-size: 0.875rem;
  color: ${({ theme }) => theme.colorInfo};
  font-style: italic;
`;

const EventNavigation = styled.div`
  width: 100%;
  position: relative;
  font-size: 1.125rem;
  padding: 3rem 0;
  margin-bottom: 4rem;
  border-top: 1px solid var(--text);
  display: flex;
  justify-content: space-between;

  span {
    color: var(--highlight);
    font-size: 1rem;
    font-weight: 600;
  }

  a {
    display: flex;
    flex-direction: column;
  }
`;

interface Props {
  event: IEvent;
  nextEvent: IBasePage | null;
  prevEvent: IBasePage | null;
  speakers: ISpeaker[];
  preview: boolean;
  darkMode: DarkMode;
}

export default function Event({
  event,
  prevEvent,
  nextEvent,
  speakers,
  preview,
  darkMode,
}: Props): JSX.Element {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Head>
        <title>{event.name} | Novatalks </title>
      </Head>

      <Header
        title={event.name}
        pageType={{ page: event.page }}
        darkMode={darkMode}
      />
      <HeaderPadding />

      <main>
        <PaddingContainer>
          <EventArticle>
            <HeaderImgContent>
              <HeaderImg>
                <Image
                  src={event.image.url}
                  alt={`${event.name} header image`}
                  layout="fill"
                  objectFit="contain"
                />
              </HeaderImg>
              <HeaderContent>
                <h1>{event.name}</h1>
                {event.startTime && (
                  <EventTime
                    startTime={event.startTime}
                    endTime={event.endTime}
                    lang={event.page.currentLang}
                  />
                )}
                <EventHeaderShare>
                  <Inverted>
                    {event.facebookLink && (
                      <a
                        href={event.facebookLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <RiFacebookLine color="black" size={50} />
                      </a>
                    )}
                    {event.recordingLink && (
                      <a
                        href={event.recordingLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <RiVideoLine color="black" size={50} />
                      </a>
                    )}
                  </Inverted>

                  {event.zoomLink && (
                    <SquareButton title="Zoom Link" href={event.zoomLink} />
                  )}
                </EventHeaderShare>
              </HeaderContent>
            </HeaderImgContent>

            {speakers.length > 0 && <SpeakerCardWrapper speakers={speakers} />}
            {event.data.content.map(item => (
              <section key={item.heading}>
                <h2>{item.heading}</h2>
                <p
                  dangerouslySetInnerHTML={{
                    __html: RichText.asHtml(item.body),
                  }}
                />
              </section>
            ))}
          </EventArticle>

          {event.page.last_publication_date &&
            event.page.last_publication_date >
              event.page.first_publication_date && (
              <LastEditSpan>
                * edited{' '}
                {formattedDateTime(
                  event.page.last_publication_date,
                  event.page.currentLang
                )}
              </LastEditSpan>
            )}

          <EventNavigation>
            {prevEvent && (
              <LinkResolver page={prevEvent}>
                <a>
                  {prevEvent.name}
                  <span>Previous event</span>
                </a>
              </LinkResolver>
            )}

            {nextEvent && (
              <LinkResolver page={nextEvent}>
                <a>
                  {nextEvent.name}
                  <span>Next event</span>
                </a>
              </LinkResolver>
            )}
          </EventNavigation>

          {preview && (
            <aside>
              <Link href="/api/exit-preview">
                <a>Exit Preview</a>
              </Link>
            </aside>
          )}
        </PaddingContainer>
      </main>
      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return getRepetitiveStaticPaths(undefined, PageTypeEnum.Event);
};

export const getStaticProps: GetStaticProps = async ({
  params: { slug },
  preview = false,
  previewData,
  locale,
}) => {
  const prismic = getPrismicClient();
  const response = await prismic.getByUID(PageTypeEnum.Event, String(slug), {
    // ref: previewData?.ref ?? null,
    // should be fixed, see https://prismic.io/docs/technologies/previews-nextjs#5.-hot-reloads-in-next.js
    lang: localePathToPrismic(locale),
  });

  if (!response) {
    return {
      notFound: true,
    };
  }

  // get immediate next and previous events

  const prevEventResponse = (
    await prismic.query(
      Prismic.predicates.at('document.type', PageTypeEnum.Event),
      {
        pageSize: 1,
        after: response.id,
        orderings: '[document.first_publication_date desc]',
        fetch: ['event.name', 'event.description'],
        lang: localePathToPrismic(locale),
      }
    )
  ).results[0];

  const prevEvent =
    prevEventResponse == null
      ? prevEventResponse
      : deconstructIBasePage(prevEventResponse, locale, PageTypeEnum.Event);

  const nextEventResponse = (
    await prismic.query(
      Prismic.predicates.at('document.type', PageTypeEnum.Event),
      {
        pageSize: 1,
        after: response.id,
        orderings: '[document.first_publication_date]',
        fetch: [
          'event.name',
          'event.description',
          'event.starttime',
          'event.endtime',
        ],
      }
    )
  ).results[0];

  const nextEvent =
    nextEventResponse == null
      ? nextEventResponse
      : deconstructIBasePage(nextEventResponse, locale, PageTypeEnum.Event);

  // deconstruct event
  const event: IEvent = deconstructEvent(response, locale);

  // get related speakers
  let speakers: ISpeaker[] = [];
  if (
    event.speakersIds !== [] &&
    event.speakersIds.length > 0 &&
    event.speakersIds !== [undefined]
  ) {
    const speakersResponse = await getDocsByIDs(
      prismic,
      'my.speaker.uid',
      event.speakersIds,
      locale
    );
    speakers = speakersResponse.results.map(speaker =>
      deconstructSpeaker(speaker, locale)
    );
  }

  return {
    props: {
      event,
      prevEvent: prevEvent ?? null,
      nextEvent: nextEvent ?? null,
      speakers,
      preview,
    },
    // revalidate: 60 * 60 * 24, // 24 Horas
  };
};
