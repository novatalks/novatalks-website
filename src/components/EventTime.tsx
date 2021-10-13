import styled from 'styled-components';
import React from 'react';

import { pt, enUS as en } from 'date-fns/locale';
import {
  parseISO,
  format,
  differenceInDays,
  intervalToDuration,
} from 'date-fns';
import { RiCalendarLine } from 'react-icons/ri';
import { localePos } from '../helpers/prismic';

const OuterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  time {
    color: ${({ theme }) => theme.colorInfo};
    font: 300 1.4rem 'Raleway', sans-serif;
  }
  svg {
    margin-right: 1rem;
  }
`;

const Pad = styled.span`
  padding: 0 5px;
`;

interface Props {
  startTime: string;
  endTime?: string;
  lang: string;
}

export default function EventTime({
  startTime,
  endTime,
  lang,
}: Props): JSX.Element {
  const startDate: Date = parseISO(startTime);
  const endDate: Date = parseISO(endTime);
  const duration: Duration = intervalToDuration({
    start: startDate,
    end: endDate,
  });
  const dayDif: number = differenceInDays(endDate, startDate);
  const locale: Locale = localePos(lang) === 0 ? pt : en;

  return (
    <OuterWrapper>
      <RiCalendarLine color="#BBBBBB" size={20} />
      <TimeDate date={startDate} locale={locale} />
      <Pad />
      {dayDif === 0 && <TimeDate2 date={endDate} locale={locale} />}
      {dayDif !== 0 && <TimeDate date={endDate} locale={locale} />}
    </OuterWrapper>
  );
}

interface TimeProps {
  date: Date;
  locale: Locale;
}

function TimeDate({ date, locale }: TimeProps) {
  return (
    <OuterWrapper>
      <time
        dateTime={format(date, 'dd-mm-yyyy,HH:mm', {
          locale,
        })}
      >
        {' '}
        {format(date, 'dd MMM yyyy: HH:mm', {
          locale,
        })}
      </time>
    </OuterWrapper>
  );
}

function TimeDate2({ date, locale }: TimeProps) {
  return (
    <OuterWrapper>
      <time
        dateTime={format(date, 'HH:mm', {
          locale,
        })}
      >
        {' '}
        {format(date, 'HH:mm', {
          locale,
        })}
      </time>
    </OuterWrapper>
  );
}

interface TimeDurationProps {
  duration: Duration;
  locale: Locale;
}

function TimeDuration({ duration, locale }: TimeDurationProps) {
  return (
    <OuterWrapper>
      {duration.hours.toLocaleString(locale.code, {
        minimumIntegerDigits: 2,
      })}{' '}
      :{' '}
      {duration.minutes.toLocaleString(locale.code, {
        minimumIntegerDigits: 2,
      })}
    </OuterWrapper>
  );
}
