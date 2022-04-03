import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { DarkMode } from 'use-dark-mode';

import { RichText } from 'prismic-dom';

import Head from 'next/head';
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
  LinkResolver,
} from '../../helpers/prismic';
import {
  deconstructSpeaker,
  deconstructCompany,
} from '../../helpers/deconstructors';
import {
  HeaderContent,
  HeaderImg,
  HeaderImgContent,
} from '../../components/Cards/HeaderImgContent';
import { SquareButton } from '../../components/SquareButton';

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
        <HeaderImgContent>
          <HeaderContent>
            <h1>{speaker.name}</h1>
            <CompanyPositionsCardWrapper>
              {speaker.company_relations.map((item, index) => (
                <CompanyPositionsCard
                  company={companies[index]}
                  company_relation={item}
                />
              ))}
            </CompanyPositionsCardWrapper>
          </HeaderContent>
          <HeaderImg>
            <Image
              src={speaker.image.url}
              alt={`${speaker.name} header image`}
              layout="fill"
              objectFit="contain"
            />
          </HeaderImg>
        </HeaderImgContent>
        <main>
          <p
            dangerouslySetInnerHTML={{
              __html: RichText.asHtml(speaker.description),
            }}
          />
        </main>
      </PaddingContainer>
      <Footer>
        {speaker.page.currentLang === 'en' && (
          <Link href="/speakers">
            <SquareButton title="See all speakers" href="/speakers" target="" />
          </Link>
        )}
        {speaker.page.currentLang === 'pt' && (
          <SquareButton
            title="Ver todos os convidados"
            href="/speakers"
            target=""
          />
        )}
      </Footer>
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
