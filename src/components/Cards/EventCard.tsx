import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { pt } from 'date-fns/locale';
import fmt from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { RichText } from 'prismic-dom';
import { IEventThumb } from '../../helpers/interfaces';
import { ImgBGWrapper } from '../../assets/DefaultStyles';
import { LinkResolver } from '../../helpers/prismic';

const Date = styled.time`
  position: absolute;
  top: -30px;
`;
const TextDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row wrap;
  padding: 15px;
`;
const TextOuterDiv = styled.div`
  width: 100%;
  display: flex;
  p {
    font: 300 1.2rem 'Raleway', sans-serif;
    text-align: center;
  }
`;

const OuterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  height: ${({ theme }) => theme.eventDivHeight};
  border: ${({ theme }) => theme.defaultBorderLight} solid
    ${({ theme }) => theme.text};
  box-sizing: border-box;

  > :first-child {
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
    > :first-child {
      filter: unset;
    }
  }
`;

interface Props {
  event: IEventThumb;
}

export default function EventCard({ event }: Props): JSX.Element {
  return (
    <div>
      <Date>
        <FiCalendar color="#BBBBBB" size={20} />
        {fmt(parseISO(event.startTime), 'dd MMM yyyy', {
          locale: pt,
        })}
      </Date>
      <OuterWrapper key={event.page.uid}>
        <LinkResolver page={event}>
          <ImgBGWrapper>
            <Image
              src={event.image.url}
              alt={`${event.name} picture`}
              height={248}
              width={248}
              objectFit="cover"
            />
          </ImgBGWrapper>
        </LinkResolver>
        <TextDiv>
          <h3>{event.name}</h3>
          <p>{event.description}</p>
        </TextDiv>
        <footer>
          <FiUser color="#BBBBBB" size={20} />
        </footer>
      </OuterWrapper>
    </div>
  );
}
