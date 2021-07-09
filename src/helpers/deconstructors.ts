import * as interfaces from './interfaces';

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
    ...deconstructIPage(response, locale, interfaces.PageTypeEnum.Company),
    ...deconstructINameDescription(response),
  };
};

export const deconstructCompany = (response, locale): interfaces.ICompany => {
  return {
    ...deconstructIPage(response, locale, interfaces.PageTypeEnum.Company),
    ...deconstructINameDescription(response),
    ...deconstructIImage(response),
  };
};

export const deconstructEventThumb = (
  response,
  locale
): interfaces.IEventThumb => {
  return {
    ...deconstructIBaseImagePage(
      response,
      locale,
      interfaces.PageTypeEnum.Event
    ),
    ...deconstructINameDescription(response),
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
    ...deconstructEventThumb(response, locale),
    speakersIds: speakerIds,
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
