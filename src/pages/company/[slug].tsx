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

import { PaddingContainer, HeaderPadding } from '../../assets/DefaultStyles';

import Footer from '../../components/Footer';
import Header from '../../components/Header';

import { ICompany, PageTypeEnum } from '../../helpers/interfaces';
import { getRepetitiveStaticPaths, getDocByID } from '../../helpers/prismic';
import { deconstructCompany } from '../../helpers/deconstructors';

interface CompanyProps {
  company: ICompany;
  preview: boolean;
  darkMode: DarkMode;
}

export default function Company({ company, preview, darkMode }: CompanyProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Head>
        <title>{company.name} | Novatalks </title>
      </Head>

      <Header
        title={company.name}
        pageType={{ page: company.page }}
        darkMode={darkMode}
      />
      <HeaderPadding />

      <PaddingContainer>
        <div>
          <Image
            src={company.image.url}
            alt={company.image.alt}
            height={company.image.height}
            width={company.image.width}
          />
        </div>
        <main>
          <h1>{company.name}</h1>
          <p
            dangerouslySetInnerHTML={{
              __html: RichText.asHtml(company.description),
            }}
          />
          <div>
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

            {company.page.last_publication_date && (
              <span>
                * edited{' '}
                {fmt(
                  parseISO(company.page.last_publication_date),
                  "dd MMM yyyy', às 'HH:mm",
                  {
                    locale: pt,
                  }
                )}
              </span>
            )}
          </div>
        </main>
      </PaddingContainer>
      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return getRepetitiveStaticPaths(undefined, PageTypeEnum.Company);
};

export const getStaticProps: GetStaticProps = async ({
  params: { slug },
  preview = false,
  previewData,
  locale,
}) => {
  const response = await getDocByID(
    undefined,
    PageTypeEnum.Company,
    String(slug),
    locale
  );

  if (!response) {
    return {
      notFound: true,
    };
  }

  const company: ICompany = deconstructCompany(response, locale);

  return {
    props: {
      company,
      preview,
    },
    // revalidate: 60 * 60 * 24, // 24 Horas
  };
};
