import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import { IMember, ITeam, ITeamRelations } from '../../helpers/interfaces';
import { LinkResolver } from '../../helpers/prismic';

const OuterWrapper = styled.a`
  display: flex;
  justify-content: center;
  align-items: end;
  height: ${({ theme }) => theme.speakerDivHeight};
  border-bottom: ${({ theme }) => theme.defaultBorderLight} solid
    ${({ theme }) => theme.text};
  box-sizing: border-box;
  box-shadow: inset 0 -7px 0px -5px ${({ theme }) => theme.body};
  > :first-child {
    filter: grayscale(100%);
    z-index: -1;
    max-width: ${({ theme }) => {
      return `${
        parseInt(theme.speakerDivHeight, 10) -
        2 * parseInt(theme.defaultBorderLight, 10)
      }px`;
    }};
    min-width: ${({ theme }) => {
      return `${
        parseInt(theme.speakerDivHeight, 10) -
        2 * parseInt(theme.defaultBorderLight, 10)
      }px`;
    }};
    max-height: ${({ theme }) => {
      return `${
        parseInt(theme.speakerDivHeight, 10) -
        2 * parseInt(theme.defaultBorderLight, 10)
      }px`;
    }};
    min-height: ${({ theme }) => {
      return `${
        parseInt(theme.speakerDivHeight, 10) -
        2 * parseInt(theme.defaultBorderLight, 10)
      }px`;
    }};
  }

  > :nth-child(2) {
    display: flex;
    margin: 0 10px;
    height: 1.5rem;
    transition: height ${({ theme }) => theme.transitionSpeed} ease;
    p {
      font: 300 1.2rem 'Raleway', sans-serif;
      text-align: center;
    }
  }
  &:hover {
    > :first-child {
      filter: unset;
    }
    > :nth-child(2) {
      height: 65%;
    }
  }
`;

const PosDiv = styled.div`
  position: absolute;
`;

interface Props {
  member: IMember;
  teams: ITeam[];
}

export default function MemberCard({ member, teams }: Props): JSX.Element {
  return (
    <LinkResolver page={member}>
      <OuterWrapper key={member.page.uid}>
        <div>
          <Image
            src={member.image.url}
            alt={`${member.name} profile picture`}
            height={85}
            width={85}
            objectFit="cover"
          />
        </div>
        <div>
          <PosDiv />
          <p>{member.name}</p>
        </div>
        {member.team_relations.map((teamRelation: ITeamRelations) => {
          return teams.some(team => team.page.uid === teamRelation.team_id) ? (
            <p>
              {teams.find(team => team.page.uid === teamRelation.team_id).name}
            </p>
          ) : (
            <></>
          );
        })}
      </OuterWrapper>
    </LinkResolver>
  );
}
