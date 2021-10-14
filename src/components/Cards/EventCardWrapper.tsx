import React from 'react';
import styled from 'styled-components';

import { IEventThumb } from '../../helpers/interfaces';
import EventCard from './EventCard';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 8%; //width is thus 84vw
  > * {
    width: 100%;
  }
`;

const Timeline = styled.div`
  height: auto;
  margin: 0 auto;
  position: relative;

  ul {
    list-style: none;
  }
  ul li {
    padding: 0;
    border-radius: 10px;
    margin-bottom: 20px;
  }
  ul li:last-child {
    margin-bottom: 0;
  }
  @media only screen and (min-width: 768px) {
    :before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 2px;
      height: calc(100% - 120px);
      background-color: ${({ theme }) => theme.text};
    }
    ul li {
      width: 50%;
      height: 120px;
      position: relative;
      margin-bottom: 50px;
    }
    ul li:nth-child(odd) {
      float: left;
      clear: right;
      transform: translateX(-30px);
      border-radius: 20px 0px 20px 20px;
    }
    ul li:nth-child(even) {
      float: right;
      clear: left;
      transform: translateX(30px);
      border-radius: 0px 20px 20px 20px;
    }

    ul li::before {
      content: '';
      position: absolute;
      height: 20px;
      width: 20px;
      top: 0px;
      background: ${({ theme }) => theme.body};
      border: ${({ theme }) => theme.defaultBorderLight} solid
        ${({ theme }) => theme.text};
      box-sizing: border-box;
      overflow: hidden;
    }
    ul li:nth-child(odd)::before {
      transform: translate(50%, -50%);
      right: -30px;
    }
    ul li:nth-child(even)::before {
      transform: translate(-50%, -50%);
      left: -30px;
    }
    -content .date {
      position: absolute;
      top: -30px;
    }
    ul li:hover::before {
      background-color: ${({ theme }) => theme.text};
    }
  }
`;

interface Props {
  events: IEventThumb[];
}

export default function EventCardsWrapper({ events }: Props): JSX.Element {
  return (
    <>
      <Container>
        <Timeline>
          <ul>
            {events.map((event: IEventThumb) => (
              <li>
                <EventCard event={event} />
              </li>
            ))}
          </ul>
        </Timeline>
      </Container>
    </>
  );
}
