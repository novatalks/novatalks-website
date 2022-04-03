import React from 'react';

import { IMember, ITeam, ITeamRelations } from '../../helpers/interfaces';
import { PersonCard } from './PersonCard';

interface Props {
  member: IMember;
  teams: ITeam[];
}

export function MemberCard({ member, teams }: Props): JSX.Element {
  return (
    <PersonCard person={member}>
      {member.team_relations.map((teamRelation: ITeamRelations) => {
        return teams.some(team => team.page.uid === teamRelation.team_id) ? (
          <p>
            {teams.find(team => team.page.uid === teamRelation.team_id).name}
          </p>
        ) : (
          <></>
        );
      })}
    </PersonCard>
  );
}
