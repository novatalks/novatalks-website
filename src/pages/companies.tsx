import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import { DarkMode } from 'use-dark-mode';

import Prismic from '@prismicio/client';
import { pt } from 'date-fns/locale';
import fmt from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { FiCalendar, FiUser } from 'react-icons/fi';
import Head from 'next/head';
import { RichText } from 'prismic-dom';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import styled, { useTheme } from 'styled-components';

import { PaddingContainer, HeaderPadding } from '../assets/DefaultStyles';

import Header from '../components/Header';
import Footer from '../components/Footer';

import {
  getPrismicClient,
  localePathToPrismic,
  rootIPageFromLocale,
  LinkResolver,
} from '../helpers/prismic';
import { PageTypeEnum, IPage, ICompany } from '../helpers/interfaces';
import { deconstructCompany } from '../helpers/deconstructors';

interface CompaniesPagination {
  next_page: string;
  results: ICompany[];
}

interface Props {
  companiesPagination: CompaniesPagination;
  pageType: IPage;
  darkMode: DarkMode;
}

export default function Companies({
  companiesPagination: { next_page, results },
  pageType,
  darkMode,
}: Props): JSX.Element {
  const theme = useTheme();
  const [companies, setCompanies] = useState([]);
  const [nextPage, setNextPage] = useState(next_page);

  // trigger refresh when locale changes
  useEffect(() => {
    setCompanies(results);
    setNextPage(next_page);
  }, [results, next_page]);

  // fetch more events
  async function handleGetMoreCompanies(): Promise<void> {
    const response = await (await fetch(nextPage)).json();
    const newCompanies: ICompany[] = response.results.map(newCompany =>
      deconstructCompany(newCompany, pageType.page.currentLang)
    );
    setCompanies([...companies, ...newCompanies]);
    setNextPage(response.next_page);
  }

  return (
    <>
      <Head>
        <title>Companies | Novatalks</title>
      </Head>

      <Header title="Novatalks" pageType={pageType} darkMode={darkMode} />

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
            {companies.map((company: ICompany) => (
              <div key={company.page.uid}>
                <LinkResolver page={company}>
                  <a>
                    <strong>{company.name}</strong>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: RichText.asHtml(company.description),
                      }}
                    />
                    <footer>
                      <time>
                        <FiCalendar color="#BBBBBB" size={20} />
                        {fmt(
                          parseISO(company.page.first_publication_date),
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
            ))}
            {nextPage && (
              <button type="button" onClick={handleGetMoreCompanies}>
                Load more Companies
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
  const companiesResponse = await prismic.query(
    Prismic.predicates.at('document.type', PageTypeEnum.Company),
    {
      // fetch: ['company.name', 'company.description'],
      pageSize: process.env.eventsOnIndex,
      lang: localePathToPrismic(locale),
    }
  );

  const companies: ICompany[] = companiesResponse.results.map(company =>
    deconstructCompany(company, locale)
  );

  const pageType = rootIPageFromLocale(locale, PageTypeEnum.RootCompanies);

  return {
    props: {
      companiesPagination: {
        results: companies,
        next_page: companiesResponse.next_page,
      },
      pageType,
    },
  };
};
