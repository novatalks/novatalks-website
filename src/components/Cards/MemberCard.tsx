import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import { IMember, ITeam, ITeamRelations } from '../../helpers/interfaces';

const TextOuterDiv = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
const TextDiv = styled.div`
  width: 200%;
  height: 100%;
  display: flex;
  transition: transform ${({ theme }) => theme.transitionSpeed} ease;
`;
const TextInnerDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    font: 300 1.2rem 'Raleway', sans-serif;
    text-align: center;
  }
`;

const OuterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  height: ${({ theme }) => theme.memberDivHeight};
  border: ${({ theme }) => theme.defaultBorderLight} solid
    ${({ theme }) => theme.text};
  box-sizing: border-box;
  > :first-child {
    filter: grayscale(100%);
    z-index: -1;
    max-width: ${({ theme }) => {
      return `${
        parseInt(theme.memberDivHeight, 10) -
        2 * parseInt(theme.defaultBorderLight, 10)
      }px`;
    }};
    min-width: ${({ theme }) => {
      return `${
        parseInt(theme.memberDivHeight, 10) -
        2 * parseInt(theme.defaultBorderLight, 10)
      }px`;
    }};
    max-height: ${({ theme }) => {
      return `${
        parseInt(theme.memberDivHeight, 10) -
        2 * parseInt(theme.defaultBorderLight, 10)
      }px`;
    }};
    min-height: ${({ theme }) => {
      return `${
        parseInt(theme.memberDivHeight, 10) -
        2 * parseInt(theme.defaultBorderLight, 10)
      }px`;
    }};
  }

  &:hover {
    > :first-child {
      filter: unset;
    }
    > :nth-child(2) > ${TextDiv} {
      transform: translateX(-50%);
    }
  }
`;

interface Props {
  member: IMember;
  teams: ITeam[];
}

export function MemberCard({ member, teams }: Props): JSX.Element {
  return (
    <OuterWrapper key={member.page.uid}>
      <div>
        <Image
          src={member.image.url}
          alt={`${member.name} profile picture`}
          height={98}
          width={98}
          objectFit="cover"
        />
      </div>
      <TextOuterDiv>
        <TextDiv>
          <TextInnerDiv>
            <p>{member.name}</p>
          </TextInnerDiv>
          <TextInnerDiv>
            {member.team_relations.map((teamRelation: ITeamRelations) => {
              return teams.some(
                team => team.page.uid === teamRelation.team_id
              ) ? (
                <p>
                  {
                    teams.find(team => team.page.uid === teamRelation.team_id)
                      .name
                  }
                </p>
              ) : (
                <></>
              );
            })}
          </TextInnerDiv>
        </TextDiv>
      </TextOuterDiv>
    </OuterWrapper>
  );
}
