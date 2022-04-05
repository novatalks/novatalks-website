import React from 'react';
import styled from 'styled-components';

import { IEventThumb } from '../../helpers/interfaces';
import { EventCard } from './EventCard';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: start;
  justify-content: center;
  padding: 60px 8%; //width is thus 84vw
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
  @media (min-width: ${({ theme }) => theme.minSizes.small}) {
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
    }
    ul li:nth-child(even) {
      float: right;
      clear: left;
      transform: translateX(30px);
    }

    // vertical line and square marks
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
    ul li:hover::before {
      background-color: ${({ theme }) => theme.text};
    }
  }
`;

interface Props {
  events: IEventThumb[];
}

export function EventCardWrapper({ events }: Props): JSX.Element {
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
