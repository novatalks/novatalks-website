import { GetStaticProps } from 'next';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
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

import {
  PaddingContainer,
  HeaderPadding,
  TopSpacedDiv,
} from '../assets/DefaultStyles';

import Header from '../components/Header';
import Footer from '../components/Footer';

import {
  getPrismicClient,
  localePathToPrismic,
  rootIPageFromLocale,
  LinkResolver,
  getDocsByIDs,
} from '../helpers/prismic';
import {
  PageTypeEnum,
  IPage,
  ICompany,
  IMember,
  ITeam,
  ITeamRelations,
} from '../helpers/interfaces';
import {
  deconstructCompany,
  deconstructITeam,
  deconstructMember,
} from '../helpers/deconstructors';
import MemberCardWrapper from '../components/Cards/MemberCardWrapper';
import CompanyCardWrapper from '../components/Cards/CompanyCardWrapper';

interface CompaniesPagination {
  next_page: string;
  results: ICompany[];
}

interface Props {
  partnersPagination: CompaniesPagination;
  members: IMember[];
  teams: ITeam[];
  pageType: IPage;
  darkMode: DarkMode;
}

export default function About({
  partnersPagination: { next_page, results },
  members,
  teams,
  pageType,
  darkMode,
}: Props): JSX.Element {
  const theme = useTheme();
  const [partners, setCompanies] = useState([]);
  const [nextPage, setNextPage] = useState(next_page);

  // trigger refresh when locale changes
  useEffect(() => {
    setCompanies(results);
    setNextPage(next_page);
  }, [results, next_page]);

  // fetch more events
  async function handleGetMorePartners(): Promise<void> {
    const response = await (await fetch(nextPage)).json();
    const newPartners: ICompany[] = response.results.map(newCompany =>
      deconstructCompany(newCompany, pageType.page.currentLang)
    );
    setCompanies([...partners, ...newPartners]);
    setNextPage(response.next_page);
  }

  return (
    <>
      <Head>
        <title>About Us | Novatalks</title>
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
            <h1>About us</h1>
            <h2>Our Mission</h2>
            <p>
              Com a NOVATalks pretendemos levar-te a debater e reflectir para
              além do curso e partilhar com o mundo a tua visão do futuro, bem
              como dar-te a conhecer todo um universo de tecnologias que já
              existem e vão dar que falar.
            </p>

            <h2>Our Partners</h2>
            <CompanyCardWrapper companies={partners} />
            {nextPage && (
              <button type="button" onClick={handleGetMorePartners}>
                Load more Companies
              </button>
            )}

            <h2>Our Team</h2>
            <MemberCardWrapper members={members} teams={teams} />
          </PaddingContainer>
        </m.main>
      </LazyMotion>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const prismic = getPrismicClient();
  const partnersResponse = await prismic.query(
    [
      Prismic.predicates.at('document.type', PageTypeEnum.Company),
      Prismic.Predicates.at('my.company.ispartner', true),
    ],
    {
      // fetch: ['company.name', 'company.description'],
      pageSize: process.env.eventsOnIndex,
      lang: localePathToPrismic(locale),
    }
  );

  const membersResponse = await prismic.query(
    Prismic.predicates.at('document.type', PageTypeEnum.Member),
    {
      orderings: '[my.member.name]',
      lang: localePathToPrismic(locale),
    }
  );

  const partners: ICompany[] = partnersResponse.results.map(partner =>
    deconstructCompany(partner, locale)
  );

  const members: IMember[] = membersResponse.results.map(member =>
    deconstructMember(member, locale)
  );

  const teamIds: string[] = members.flatMap(member =>
    member.team_relations.map(team => team.team_id)
  );
  const teamIdsUnique: string[] = Array.from(new Set(teamIds));

  const teamsResults = await getDocsByIDs(
    prismic,
    'my.team.uid',
    teamIdsUnique,
    locale
  );

  const teams: ITeam[] = teamsResults.results.map(member =>
    deconstructITeam(member, locale)
  );

  const pageType = rootIPageFromLocale(locale, PageTypeEnum.RootAboutUs);

  return {
    props: {
      partnersPagination: {
        results: partners,
        next_page: partnersResponse.next_page,
      },
      members,
      teams,
      pageType,
    },
  };
};
