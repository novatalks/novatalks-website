import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { DarkMode } from 'use-dark-mode';

import { RichText } from 'prismic-dom';

import Head from 'next/head';
import { pt } from 'date-fns/locale';
import fmt from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';
import { useRouter } from 'next/router';

import Header from '../../components/Header';
import CompanyPositionsCard from '../../components/Cards/CompanyPositionsCard';
import Footer from '../../components/Footer';
import { PaddingContainer, HeaderPadding } from '../../assets/DefaultStyles';

import { ISpeaker, ICompany, PageTypeEnum } from '../../helpers/interfaces';
import {
  getRepetitiveStaticPaths,
  getDocByID,
  getDocsByIDs,
  getPrismicClient,
} from '../../helpers/prismic';
import {
  deconstructSpeaker,
  deconstructCompany,
} from '../../helpers/deconstructors';

interface SpeakerProps {
  speaker: ISpeaker;
  companies: ICompany[];
  preview: boolean;
  darkMode: DarkMode;
}

export default function Speaker({
  speaker,
  companies,
  preview,
  darkMode,
}: SpeakerProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Head>
        <title>{speaker.name} | Novatalks </title>
      </Head>

      <Header
        title={speaker.name}
        pageType={{ page: speaker.page }}
        darkMode={darkMode}
      />
      <HeaderPadding />

      <PaddingContainer>
        <div>
          <Image
            src={speaker.image.url}
            alt={speaker.image.alt}
            height={speaker.image.height}
            width={speaker.image.width}
          />
        </div>
        <main>
          <h1>{speaker.name}</h1>
          <p
            dangerouslySetInnerHTML={{
              __html: RichText.asHtml(speaker.description),
            }}
          />
          <div>
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

            {speaker.page.last_publication_date && (
              <span>
                * edited{' '}
                {fmt(
                  parseISO(speaker.page.last_publication_date),
                  "dd MMM yyyy', às 'HH:mm",
                  {
                    locale: pt,
                  }
                )}
              </span>
            )}
          </div>

          {speaker.company_relations.map((item, index) => (
            <CompanyPositionsCard
              company={companies[index]}
              company_relation={item}
            />
          ))}
        </main>
      </PaddingContainer>
      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return getRepetitiveStaticPaths(undefined, PageTypeEnum.Speaker);
};

export const getStaticProps: GetStaticProps = async ({
  params: { slug },
  preview = false,
  previewData,
  locale,
}) => {
  const prismic = getPrismicClient();

  const response = await getDocByID(
    prismic,
    PageTypeEnum.Speaker,
    String(slug),
    locale
  );

  // return if no speaker content found
  if (!response) {
    return {
      notFound: true,
    };
  }

  // deconstruct speaker
  const speaker: ISpeaker = deconstructSpeaker(response, locale);

  // get related companies
  const companyIds: string[] = speaker.company_relations.map(
    relation => relation.company_id
  );
  const speakerCompanies = await getDocsByIDs(
    prismic,
    'my.company.uid',
    companyIds,
    locale
  );
  const companies: ICompany[] = speakerCompanies.results.map(company =>
    deconstructCompany(company, locale)
  );

  return {
    props: {
      speaker,
      companies,
      preview,
    },
    revalidate: 60 * 60 * 24, // 24 Horas
  };
};
