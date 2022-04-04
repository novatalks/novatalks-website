/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as interfaces from './interfaces';
import { trimSentenceAtLen } from './utils';

// BASIC ELEMENTS

const deconstructIPage = (
  response,
  locale,
  type = interfaces.PageTypeEnum._Unset
): interfaces.IPage => {
  return {
    page: {
      uid: response.uid,
      first_publication_date: response.first_publication_date,
      last_publication_date: response.last_publication_date,
      pageTypeEnum: type,
      currentLang: locale,
      alternativeLangs: response.alternate_languages,
    },
  };
};

const deconstructINameDescription = (response): interfaces.INameDescription => {
  return {
    name: response.data.name,
    description: response.data.description,
  };
};

const deconstructIImage = (response): interfaces.IImage => {
  return {
    image: {
      url: response.data.image.url,
      alt: response.data.image.alt,
      width: response.data.image.dimensions.width,
      height: response.data.image.dimensions.height,
    },
  };
};

// ABSTRACTOR ELEMENTS

export const deconstructIBasePage = (
  response,
  locale: string,
  pageEnum: interfaces.PageTypeEnum
): interfaces.IBasePage => {
  return {
    ...deconstructIPage(response, locale, pageEnum),
    ...deconstructINameDescription(response),
  };
};

export const deconstructIBaseImagePage = (
  response,
  locale: string,
  pageEnum: interfaces.PageTypeEnum
): interfaces.IBaseImagePage => {
  return {
    ...deconstructIBasePage(response, locale, pageEnum),
    ...deconstructIImage(response),
  };
};
// PAGE ELEMENTS

export const deconstructHome = (response, locale): interfaces.IHome => {
  return {
    ...deconstructIPage(response, locale, interfaces.PageTypeEnum.RootHome),
    ...deconstructINameDescription(response),
  };
};

export const deconstructPodcast = (response, locale): interfaces.IPodcast => {
  return {
    ...deconstructIPage(response, locale, interfaces.PageTypeEnum.RootPodcast),
    ...deconstructINameDescription(response),
    ...deconstructIImage(response),
    spotifyLink: response.data.spotifyLink,
  };
};

export const deconstructCompany = (response, locale): interfaces.ICompany => {
  return {
    ...deconstructIBaseImagePage(
      response,
      locale,
      interfaces.PageTypeEnum.Company
    ),
    ispartner: response.data.ispartner,
  };
};

export const deconstructEventThumb = (
  response,
  locale
): interfaces.IEventThumb => {
  const cutDescription =
    response.data.description != null
      ? trimSentenceAtLen(response.data.description, 100)
      : null;

  return {
    ...deconstructIBaseImagePage(
      response,
      locale,
      interfaces.PageTypeEnum.Event
    ),
    name: response.data.name,
    description: cutDescription,
    startTime: response.data.starttime,
    endTime: response.data.endtime,
  };
};

export const deconstructEvent = (response, locale): interfaces.IEvent => {
  let speakerIds: string[] = response.data.speakers.map(
    speaker => speaker.speaker.uid
  );
  speakerIds =
    response.data.speakers[0] == null ||
    response.data.speakers[0].speaker == null ||
    response.data.speakers[0].speaker.id == null
      ? []
      : speakerIds;

  return {
    ...deconstructIBaseImagePage(
      response,
      locale,
      interfaces.PageTypeEnum.Event
    ),
    ...deconstructINameDescription(response),
    startTime: response.data.starttime,
    endTime: response.data.endtime,
    speakersIds: speakerIds,
    facebookLink: response.data.facebooklink.url,
    zoomLink: response.data.zoomlink?.url ? response.data.zoomlink.url : null,
    recordingLink: response.data.recordinglink?.url
      ? response.data.recordinglink.url
      : null,
    data: {
      content: response.data.content,
    },
  };
};

export const deconstructSpeaker = (response, locale): interfaces.ISpeaker => {
  // map company relations
  const companyRelations: interfaces.ICompanyRelations[] = [];
  response.data.body.map((item, index) => {
    if (item.slice_type === 'company_relation') {
      companyRelations[index] = {
        company_id: item.primary.company.uid,
        positions: item.items,
      };
    }
  });

  return {
    ...deconstructIPage(response, locale, interfaces.PageTypeEnum.Speaker),
    ...deconstructINameDescription(response),
    ...deconstructIImage(response),
    company_relations: companyRelations,
  };
};

export const deconstructMember = (response, locale): interfaces.IMember => {
  // map member team relations
  const teamRelations: interfaces.ITeamRelations[] = [];
  response.data.body.map((item, index) => {
    if (item.slice_type === 'team_relation') {
      teamRelations[index] = {
        team_id: item.primary.team.uid,
      };
    }
  });

  return {
    ...deconstructIPage(response, locale, interfaces.PageTypeEnum.Member),
    ...deconstructIImage(response),
    name: response.data.name,
    isActiveMember: response.data.is_active_member,
    team_relations: teamRelations,
  };
};

export const deconstructITeam = (response, locale): interfaces.ITeam => {
  return {
    ...deconstructIPage(response, locale, interfaces.PageTypeEnum.Member),
    name: response.data.name,
  };
};
