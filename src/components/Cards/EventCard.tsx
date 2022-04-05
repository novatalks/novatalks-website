import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import { useTheme } from 'styled-components';
import { IEventThumb } from '../../helpers/interfaces';
import { ImgBGWrapperA } from '../../assets/DefaultStyles';
import { LinkResolver } from '../../helpers/prismic';
import { SquareButton } from '../SquareButton';
import { EventTime } from '../EventTime';

const TextDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-evenly;
  padding: 15px;
  h3 {
    @media (min-width: ${({ theme }) => theme.minSizes.small}) {
      font-size: 1.3rem;
      inline-size: calc(42vw - 200px - 30px);
      overflow-wrap: break-word;
    }
    @media (min-width: ${({ theme }) => theme.minSizes.large}) {
      font-size: 1.7rem;
    }
  }
  p {
    @media (max-width: 989px) {
      padding-bottom: 0.5rem;
    }
  }
`;

const OuterTextDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;

  > :nth-child(1) {
    display: none;
  }
  > :nth-child(2) div {
    width: calc(84vw - (2 * ${({ theme }) => theme.defaultBorderLight}));
    height: calc(84vw - (2 * ${({ theme }) => theme.defaultBorderLight}));
  }

  @media (min-width: ${({ theme }) => theme.minSizes.tablet}) {
    display: grid;
    grid-template-columns: 1fr 1fr;

    > :nth-child(1) {
      grid-area: 2 / 1 / 3 / 3;
      display: flex;
    }
    > :nth-child(2) div {
      width: auto;
      height: auto;
    }
    > :nth-child(3) {
      grid-area: 1 / 2 / 2 / 2;
    }
  }
  @media (min-width: 990px) {
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
    > :nth-child(1) {
      grid-area: unset;
      width: 196px;
      height: 196px;
      right: 0;
    }
    > :nth-child(2) {
      grid-area: unset;
    }
    > :nth-child(3) {
      grid-area: unset;
      position: absolute;
      left: 100%;
    }
    > :nth-child(3),
    > :nth-child(1) {
      width: calc(42vw - 200px);
    }
  }
`;

const OuterWrapper = styled.div`
  position: relative;
  height: auto;
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

  @media (min-width: 990px) {
    height: ${({ theme }) => theme.eventDivHeight};
  }
`;

const OutMostDiv = styled.div`
  width: 100%;
`;

interface Props {
  event: IEventThumb;
}

export function EventCard({ event }: Props): JSX.Element {
  const theme = useTheme();

  return (
    <OutMostDiv>
      <OuterWrapper key={event.page.uid}>
        <OuterTextDiv>
          <TextDiv>
            <p>{event.description}</p>
            {event.page.currentLang === 'en' && (
              <LinkResolver page={event}>
                <SquareButton title="See Event" target="" />
              </LinkResolver>
            )}
            {event.page.currentLang === 'pt' && (
              <LinkResolver page={event}>
                <SquareButton title="Ver Evento" target="" />
              </LinkResolver>
            )}
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
            <LinkResolver page={event}>
              <h3>{event.name}</h3>
            </LinkResolver>
            {event.startTime && (
              <EventTime
                startTime={event.startTime}
                endTime={event.endTime}
                lang={event.page.currentLang}
                alignLeft
                onlyStart
              />
            )}
          </TextDiv>
        </OuterTextDiv>
      </OuterWrapper>
    </OutMostDiv>
  );
}
