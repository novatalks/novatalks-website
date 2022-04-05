import React from 'react';
import styled from 'styled-components';

import { ICompany } from '../../helpers/interfaces';
import { CompanyCard } from './CompanyCard';

const CardsDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  gap: 10px;
  > * {
    margin: 0;
  }
`;

interface Props {
  companies: ICompany[];
}

export function CompanyCardWrapper({ companies }: Props): JSX.Element {
  return (
    <>
      <CardsDiv>
        {companies.map((company: ICompany) => (
          <CompanyCard company={company} />
        ))}
      </CardsDiv>
    </>
  );
}
