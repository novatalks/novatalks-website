import styled from 'styled-components';
import React from 'react';
import { parseISO, differenceInDays, intervalToDuration } from 'date-fns';
import { RiCalendarEventLine } from 'react-icons/ri';
import { formattedDateTime, formattedTime } from '../helpers/utils';

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

export function EventTime({ startTime, endTime, lang }: Props): JSX.Element {
  const startDate: Date = parseISO(startTime);
  const endDate: Date = parseISO(endTime);
  const dayDif: number = differenceInDays(endDate, startDate);

  return (
    <OuterWrapper>
      <RiCalendarEventLine color="#BBBBBB" size={20} />
      <OuterWrapper>{formattedDateTime(startTime, lang)}</OuterWrapper>
      <Pad />
      {dayDif === 0 && (
        <OuterWrapper>{formattedTime(endTime, lang)}</OuterWrapper>
      )}
      {dayDif !== 0 && (
        <OuterWrapper>{formattedDateTime(endTime, lang)}</OuterWrapper>
      )}
    </OuterWrapper>
  );
}
