import React from 'react';
import styled from 'styled-components';

import { IMember, ITeam } from '../../helpers/interfaces';
import MemberCard from './MemberCard';

const CardsDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  gap: 10px;
  > * {
    flex: 1 0 calc(10px - 30%); /*grow | shrink | basis */
    margin: 0;
  }
`;

interface Props {
  members: IMember[];
  teams: ITeam[];
}

export default function MemberCardsWrapper({
  members,
  teams,
}: Props): JSX.Element {
  return (
    <>
      <CardsDiv>
        {members.map((member: IMember) => (
          <MemberCard member={member} teams={teams} />
        ))}
      </CardsDiv>
    </>
  );
}
