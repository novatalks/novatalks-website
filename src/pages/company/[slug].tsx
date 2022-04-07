import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { DarkMode } from 'use-dark-mode';
import { RichText } from 'prismic-dom';
import { useRouter } from 'next/router';

import { HeaderPadding, PaddingContainer } from '../../assets/DefaultStyles';

import Footer from '../../components/Footer';
import Header from '../../components/Header';

import { ICompany, PageTypeEnum } from '../../helpers/interfaces';
import { getRepetitiveStaticPaths, getDocByID } from '../../helpers/prismic';
import { deconstructCompany } from '../../helpers/deconstructors';
import {
  HeaderContent,
  HeaderImg,
  HeaderImgContent,
} from '../../components/Cards/HeaderImgContent';
import { NovatalksDefaultHead } from '../../components/NovatalksDefaultHead';

interface CompanyProps {
  company: ICompany;
  preview: boolean;
  darkMode: DarkMode;
}

export default function Company({
  company,
  preview,
  darkMode,
}: CompanyProps): JSX.Element {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <NovatalksDefaultHead title={company.name} imageUrl={company.image.url} />

      <Header
        title={company.name}
        pageType={{ page: company.page }}
        darkMode={darkMode}
      />
      <HeaderPadding />
      <PaddingContainer>
        <main>
          <HeaderImgContent>
            <HeaderContent>
              <h1>{company.name}</h1>
              <p
                dangerouslySetInnerHTML={{
                  __html: RichText.asHtml(company.description),
                }}
              />
            </HeaderContent>
            <HeaderImg>
              <Image
                src={company.image.url}
                alt={company.image.alt}
                height={company.image.height}
                width={company.image.width}
              />
            </HeaderImg>
          </HeaderImgContent>
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
