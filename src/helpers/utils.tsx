import { parseISO, format } from 'date-fns';
import { pt, enUS as en } from 'date-fns/locale';
import { localePos } from './prismic';

export const trimSentenceAtLen = (str: string, len: number): string => {
  if (str.length > len) {
    return str.substring(0, len).concat('...');
  }
  return str;
};

export const langAdjustedTime = (
  time: string,
  lang: string,
  formatString = 'dd-mm-yyyy,HH:mm'
): string => {
  const date = parseISO(time);
  const locale: Locale = localePos(lang) === 0 ? pt : en;

  return format(date, formatString, {
    locale,
  });
};

export const formattedDateTime = (time: string, lang: string): JSX.Element => {
  return (
    <time dateTime={langAdjustedTime(time, lang, 'dd-mm-yyyy,HH:mm')}>
      {langAdjustedTime(time, lang, 'dd MMM yyyy@HH:mm')}
    </time>
  );
};

export const formattedDate = (time: string, lang: string): JSX.Element => {
  return (
    <time dateTime={langAdjustedTime(time, lang, 'dd-MMM-yyyy')}>
      {langAdjustedTime(time, lang, 'dd MMM yyyy')}
    </time>
  );
};

export const formattedTime = (time: string, lang: string): JSX.Element => {
  return (
    <time dateTime={langAdjustedTime(time, lang, 'HH:mm')}>
      {langAdjustedTime(time, lang, 'HH:mm')}
    </time>
  );
};
