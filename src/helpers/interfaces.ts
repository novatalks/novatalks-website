import { AlternateLanguage } from '@prismicio/client/types/documents';

// Enum should be same as Prismic
export enum PageTypeEnum {
  Company = 'company',
  Event = 'event',
  Member = 'member',
  Speaker = 'speaker',
  Team = 'team',
  _Unset = 'unset',
  Root = 'root',
  RootHome = 'home',
  RootCompanies = 'companies',
  RootAboutUs = 'about',
  RootSpeakers = 'speakers',
}

// BASIC ELEMENTS

export default interface Lang {
  currentLang: string | null;
  alternativeLangs: AlternateLanguage[] | null;
}

export interface IPage {
  page: {
    uid: string;
    first_publication_date?: string | null;
    last_publication_date?: string | null;
    pageTypeEnum: PageTypeEnum;
    currentLang: string | null;
    alternativeLangs: AlternateLanguage[] | null;
  };
}

export interface INameDescription {
  name: string;
  description: {
    text: string;
  }[];
}

export interface IImage {
  image: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
}

// ABSTRACTOR ELEMENTS

export interface IBasePage extends IPage, INameDescription {}
export interface IBaseImagePage extends IBasePage, IImage {}

// PAGE ELEMENTS

export type IHome = IBasePage;

export interface IEventThumb extends IBaseImagePage {
  startTime?: string;
  endTime?: string;
}

export interface IEvent extends IEventThumb {
  speakersIds: string[];
  data: {
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

export interface ICompanyRelations {
  company_id: string;
  positions: {
    position: string;
  }[];
}

export interface ICompany extends IBaseImagePage {
  ispartner: boolean;
}

export interface ISpeaker extends IBaseImagePage {
  company_relations: ICompanyRelations[];
}

export interface ITeamRelations {
  team_id: string;
}

export interface IMember extends IPage, IImage {
  name: string;
  isActiveMember: boolean;
  team_relations: ITeamRelations[];
}

export interface ITeam extends IPage {
  name: string;
}
