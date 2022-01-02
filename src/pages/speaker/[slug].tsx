import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { DarkMode } from 'use-dark-mode';

import { RichText } from 'prismic-dom';

import Head from 'next/head';
import { pt } from 'date-fns/locale';
import fmt from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { FiCalendar } from 'react-icons/fi';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import Header from '../../components/Header';
import { CompanyPositionsCard } from '../../components/Cards/CompanyPositionsCard';
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

const SpeakerHeader = styled.div`
  display: flex;
  flex-flow: row nowrap;
  position: relative;
  margin: 2rem 0;
  width: 100%;
  height: 350px;
  text-align: center;

  > :nth-child(2) {
    width: 35%;
  }

  > :nth-child(1) {
    width: 65%;
  }
`;

const SpeakerHeaderImg = styled.div`
  position: relative;
`;

const SpeakerHeaderContent = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-evenly;
  align-items: center;
  margin: 10px;
`;

const CompanyPositionsCardWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

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
}: SpeakerProps): JSX.Element {
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
        <SpeakerHeader>
          <SpeakerHeaderContent>
            <h1>{speaker.name}</h1>
            <CompanyPositionsCardWrapper>
              {speaker.company_relations.map((item, index) => (
                <CompanyPositionsCard
                  company={companies[index]}
                  company_relation={item}
                />
              ))}
            </CompanyPositionsCardWrapper>
          </SpeakerHeaderContent>
          <SpeakerHeaderImg>
            <Image
              src={speaker.image.url}
              alt={`${speaker.name} header image`}
              layout="fill"
              objectFit="contain"
            />
          </SpeakerHeaderImg>
        </SpeakerHeader>
        <main>
          <p
            dangerouslySetInnerHTML={{
              __html: RichText.asHtml(speaker.description),
            }}
          />
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

  console.log(speakerCompanies.results_size);

  let companies: ICompany[] = [];

  if (speakerCompanies.results_size < 8) {
    companies = speakerCompanies.results.map(company =>
      deconstructCompany(company, locale)
    );
  }

  return {
    props: {
      speaker,
      companies,
      preview,
    },
    // revalidate: 60 * 60 * 24, // 24 Horas
  };
};
