import styled from 'styled-components';
import React from 'react';
import { parseISO, differenceInDays } from 'date-fns';
import { RiCalendarEventLine } from 'react-icons/ri';
import { formattedDateTime, formattedTime } from '../helpers/utils';

const OuterWrapper = styled.div`
  display: flex;
  justify-content: ${props => (props.alignLeft ? 'start' : 'center')};
  align-items: ${props => (props.alignLeft ? 'start' : 'center')};
  time {
    color: ${({ theme }) => theme.colorInfo};
    font: 300, ${props => (props.alignLeft ? '1.0rem' : '1.4rem')} 'Raleway',
      sans-serif;
  }
  svg {
    margin-right: ${props => (props.alignLeft ? '0.3rem' : '1.4rem')};
  }
`;

const Pad = styled.span`
  padding: 0 5px;
`;

interface Props {
  startTime: string;
  endTime?: string;
  lang: string;
  alignLeft?: boolean;
  onlyStart?: boolean;
}

export function EventTime({
  startTime,
  endTime,
  lang,
  alignLeft = false,
  onlyStart = false,
}: Props): JSX.Element {
  const startDate: Date = parseISO(startTime);
  const endDate: Date = parseISO(endTime);
  const dayDif: number = differenceInDays(endDate, startDate);

  return (
    <OuterWrapper alignLeft={alignLeft}>
      <RiCalendarEventLine color="#BBBBBB" size={20} />
      <OuterWrapper>{formattedDateTime(startTime, lang)}</OuterWrapper>
      {!onlyStart && (
        <>
          <Pad />
          {dayDif === 0 && (
            <OuterWrapper>{formattedTime(endTime, lang)}</OuterWrapper>
          )}
          {dayDif !== 0 && (
            <OuterWrapper>{formattedDateTime(endTime, lang)}</OuterWrapper>
          )}
        </>
      )}
    </OuterWrapper>
  );
}
