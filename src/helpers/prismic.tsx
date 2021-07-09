import React, { FC } from 'react';
import Link from 'next/link';
import Prismic from '@prismicio/client';
import { DefaultClient } from '@prismicio/client/types/client';
import { AlternateLanguage } from '@prismicio/client/types/documents';
import * as interfaces from './interfaces';
import { PageTypeEnum } from './interfaces';

const resolver = (page: interfaces.IPage) => {
  switch (page.page.pageTypeEnum) {
    case PageTypeEnum.RootHome:
      return '/';
    case PageTypeEnum.RootSpeakers:
    case PageTypeEnum.RootCompanies:
      return `/${page.page.pageTypeEnum}`;
    default:
      return `/${page.page.pageTypeEnum}/${page.page.uid}`;
  }
  return '/';
};

export const linkResolver = (page: interfaces.IPage) => {
  return resolver(page);
};

export const hrefResolver = (page: interfaces.IPage) => {
  return resolver(page);
};

export function localePathToPrismic(localePath: string) {
  let localeStrings = process.env.localeStrings;
  for (let i = 0; i < localeStrings.length; i++) {
    if (localePath === localeStrings[i][0]) {
      localePath = localeStrings[i][1];
    }
  }
  return localePath;
}

export function localePrismicToPath(localePath: string): string {
  let localeStrings = process.env.localeStrings;
  for (let i = 0; i < localeStrings.length; i++) {
    if (localePath === localeStrings[i][1]) {
      localePath = localeStrings[i][0];
    }
  }
  return localePath;
}

export function localePos(localePath: string): number {
  localePath = localePrismicToPath(localePath);
  let localeStrings = process.env.localeStrings;
  let i = 0;
  for (; i < localeStrings.length; i++) {
    if (localePath === localeStrings[i][0]) {
      return i;
    }
  }
  return -1;
}

// use only for root pages
export function rootIPageFromLocale(
  locale: string,
  pageTypeEnum: PageTypeEnum
): interfaces.IPage {
  locale = localePrismicToPath(locale);
  let localeStrings = process.env.localeStrings;
  let altLang =
    locale == localeStrings[0][0]
      ? localePathToPrismic(localeStrings[1][0])
      : localePathToPrismic(localeStrings[0][0]);

  let alternativeLang: AlternateLanguage = {
    id: '',
    type: '',
    lang: altLang,
  };

  const pageType: interfaces.IPage = {
    page: {
      uid: '',
      pageTypeEnum: pageTypeEnum,
      currentLang: locale,
      alternativeLangs: [alternativeLang],
    },
  };

  return pageType;
}

// FETCHERS

export function getPrismicClient(req?: unknown): DefaultClient {
  const prismic = Prismic.client(process.env.PRISMIC_API_ENDPOINT, {
    req,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  });

  return prismic;
}
export const getRepetitiveStaticPaths = async (
  prismic = getPrismicClient(),
  docType: string
) => {
  const docs = await prismic.query(
    Prismic.Predicates.at('document.type', docType),
    { lang: '*' }
  );

  const paths = docs.results.map(doc => ({
    params: { slug: doc.uid },
    locale: localePrismicToPath(doc.lang),
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getDocByID = async (
  prismic = getPrismicClient(),
  docType: string,
  slug: string,
  locale: string
) => {
  return await prismic.getByUID(docType, slug, {
    // ref: previewData?.ref ?? null,
    // should be fixed for events, see https://prismic.io/docs/technologies/previews-nextjs#5.-hot-reloads-in-next.js
    lang: localePathToPrismic(locale),
  });
};

export const getDocsByIDs = async (
  prismic = getPrismicClient(),
  myTpeName: string,
  array: string[],
  locale: string
) => {
  return await prismic.query(Prismic.predicates.any(myTpeName, array), {
    lang: localePathToPrismic(locale),
  });
};

// JSX helpers
type Props = {
  locale?: string | null;
  page: interfaces.IPage;
  passHref?: boolean;
};

export const LinkResolver: FC<Props> = ({
  locale = null,
  page,
  passHref = true,
  children,
}) => {
  let localeProp: any = {
    onChange: localePrismicToPath(locale),
  };

  if (locale == null) {
    localeProp = {};
  }

  return (
    <Link
      {...localeProp}
      as={linkResolver(page)}
      href={hrefResolver(page)}
      passHref={passHref}
    >
      {children}
    </Link>
  );
};
