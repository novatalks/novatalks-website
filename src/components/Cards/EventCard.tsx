import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { pt } from 'date-fns/locale';
import fmt from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { RiCalendarEventLine, RiUserFill } from 'react-icons/ri';
import { useTheme } from 'styled-components';
import { IEventThumb } from '../../helpers/interfaces';
import { ImgBGWrapperA } from '../../assets/DefaultStyles';
import { LinkResolver } from '../../helpers/prismic';
import SquareButton from '../SquareButton';

const Date = styled.time`
  position: absolute;
  top: -30px;
`;

const TextDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-evenly;
  padding: 15px;
`;

const OuterTextDiv = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  transform: translateX(
    calc(
      ${({ theme }) => {
          return `${
            parseInt(theme.eventDivHeight, 10) -
            2 * parseInt(theme.defaultBorderLight, 10)
          }px`;
        }} - 100%
    )
  );
  transition: transform ease ${({ theme }) => theme.transitionSpeed};
  grid-template-columns: 1fr ${({ theme }) => {
      return `${
        parseInt(theme.eventDivHeight, 10) -
        2 * parseInt(theme.defaultBorderLight, 10)
      }px`;
    }} 1fr;
  > div {
    height: ${({ theme }) => {
      return `${
        parseInt(theme.eventDivHeight, 10) -
        2 * parseInt(theme.defaultBorderLight, 10)
      }px`;
    }};
  }
  > :nth-child(2) {
    width: 196px;
    height: 196px;
    right: 0;
  }
  > :nth-child(3) {
    position: absolute;
    left: 100%;
  }
  > :nth-child(3),
  > :nth-child(1) {
    width: calc(42vw - 200px);
  }
`;

const OuterWrapper = styled.div`
  position: relative;
  height: ${({ theme }) => theme.eventDivHeight};
  border: ${({ theme }) => theme.defaultBorderLight} solid
    ${({ theme }) => theme.text};
  box-sizing: border-box;
  overflow: hidden;
  > ${ImgBGWrapperA} {
    max-width: ${({ theme }) => {
      return `${
        parseInt(theme.eventDivHeight, 10) -
        2 * parseInt(theme.defaultBorderLight, 10)
      }px`;
    }};
    min-width: ${({ theme }) => {
      return `${
        parseInt(theme.eventDivHeight, 10) -
        2 * parseInt(theme.defaultBorderLight, 10)
      }px`;
    }};
    max-height: ${({ theme }) => {
      return `${
        parseInt(theme.eventDivHeight, 10) -
        2 * parseInt(theme.defaultBorderLight, 10)
      }px`;
    }};
    min-height: ${({ theme }) => {
      return `${
        parseInt(theme.eventDivHeight, 10) -
        2 * parseInt(theme.defaultBorderLight, 10)
      }px`;
    }};
  }

  &:hover {
    > div {
      transform: translateX(0);
    }
  }
`;

const OutMostDiv = styled.div`
  width: 100%;
`;

interface Props {
  event: IEventThumb;
}

export default function EventCard({ event }: Props): JSX.Element {
  const theme = useTheme();

  return (
    <OutMostDiv>
      <Date>
        <p>
          <RiCalendarEventLine color={theme.text} size={20} />
          {fmt(parseISO(event.startTime), 'dd MMM yyyy', {
            locale: pt,
          })}
        </p>
      </Date>
      <OuterWrapper key={event.page.uid}>
        <OuterTextDiv>
          <TextDiv>
            <p>{event.description}</p>
            <LinkResolver page={event}>
              <SquareButton title="See Event" target="" />
            </LinkResolver>
          </TextDiv>
          <ImgBGWrapperA>
            <LinkResolver page={event}>
              <Image
                src={event.image.url}
                alt={`${event.name} picture`}
                height={248}
                width={248}
                objectFit="contain"
              />
            </LinkResolver>
          </ImgBGWrapperA>
          <TextDiv>
            <h3>{event.name}</h3>
            <p>
              <RiCalendarEventLine color={theme.text} size={20} />
              {fmt(parseISO(event.startTime), 'dd MMM yyyy', {
                locale: pt,
              })}
            </p>
          </TextDiv>
        </OuterTextDiv>
      </OuterWrapper>
    </OutMostDiv>
  );
}
