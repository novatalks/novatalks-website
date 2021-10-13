import React from 'react';
import styled from 'styled-components';

import { ISpeaker } from '../helpers/interfaces';
import SpeakerCard from './Cards/SpeakerCard';

const SpeakerCardsDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  > * {
    margin-right: 1rem;
  }
`;

const StyledP = styled.p`
  color: ${({ theme }) => theme.colorInfo};
  font-weight: 300;
`;

interface Props {
  speakers: ISpeaker[];
}

export default function SpeakerCardsSection({ speakers }: Props): JSX.Element {
  return (
    <>
      <StyledP>Speakers:</StyledP>
      <SpeakerCardsDiv>
        {speakers.map(speaker => (
          <SpeakerCard speaker={speaker} />
        ))}
      </SpeakerCardsDiv>
    </>
  );
}
