import styled from 'styled-components';
import Image from 'next/image';

import React from 'react';
import { ICompany, ICompanyRelations } from '../../helpers/interfaces';
import { LinkResolver } from '../../helpers/prismic';

const Content = styled.div`
  min-height: 50px;
  margin-left: 60px;
`;

const ImageContent = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100px;
  z-index: -1;
  top: 0;
  left: 0;
  overflow: hidden;
  position: absolute;
  div {
    position: unset !important;
  }
`;

const Card = styled.div`
  overflow: hidden;
  position: relative;
  background: none;
`;

const PositionsText = styled.p`
  color: ${({ theme }) => theme.textWeaker};
`;

interface CompanyPositionsCardProps {
  company: ICompany;
  company_relation: ICompanyRelations;
}

export function CompanyPositionsCard({
  company,
  company_relation,
}: CompanyPositionsCardProps): JSX.Element {
  return (
    <Card key={company.page.uid}>
      <ImageContent>
        <Image
          src={company.image.url}
          alt={company.image.alt}
          height={50}
          width={50}
          objectFit="contain"
        />
      </ImageContent>
      <Content>
        <LinkResolver page={company}>
          <a>
            <p>{company.name}</p>
          </a>
        </LinkResolver>
        <PositionsText>
          {company_relation.positions.map(pos => {
            return ` ${pos.position}`;
          })}
        </PositionsText>
      </Content>
    </Card>
  );
}
