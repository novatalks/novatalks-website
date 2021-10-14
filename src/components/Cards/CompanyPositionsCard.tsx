import styled from 'styled-components';
import Image from 'next/image';

import React from 'react';
import { ICompany, ICompanyRelations } from '../../helpers/interfaces';
import { LinkResolver } from '../../helpers/prismic';
import { SquareButton } from '../SquareButton';

const Position = styled.span``;

const Content = styled.div`
  width: 100%;
  text-align: center;
  background: white;
  height: 200px;
  margin-bottom: -140px;
  transition: transform 0.8s;
  border-radius: 25px 25px 0 0;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  background: white;
  height: 200px;
`;

const ImageContent = styled.div`
  pointer-events: none;
  position: absolute;
  width: 220px;
  height: 220px;
  transition: width 0.8s, height 0.8s, transform 0.8s;
  z-index: -1;
  top: -5px;
  top: -5px;
  div {
    position: unset !important;
  }
`;

const Decoration = styled.div`
  height: 195px;
  width: 195px;
  position: absolute;
  transition: border 1s;
`;

const Card = styled.div`
  height: 200px;
  width: 200px;
  background: #dddddd;
  border-radius: 10px;
  overflow: hidden;
  background: #000;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
  display: flex;
  justify-content: center;
  align-items: end;
  position: relative;
  background: none;
  &:hover {
    ${Decoration} {
      border: 2px solid ${({ theme }) => theme.text};
      border-radius: 10px;
    }
    ${ImageContent} {
      height: 100%;
      width: 100%;
      transform: translateY(-60px);
    }
    ${Content} {
      transform: translateY(-60px);
    }
  }
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
      <Decoration />
      <ImageContent>
        <Image
          src={company.image.url}
          alt={company.image.alt}
          height="300px"
          width="300px"
          objectFit="cover"
        />
      </ImageContent>
      <Content>
        <h1>{company.name}</h1>
        {company_relation.positions.map(pos => (
          <Position key={company.page.uid + pos.position}>
            {pos.position}
          </Position>
        ))}
        <LinkResolver page={company}>
          <ButtonWrapper>
            <SquareButton title="Check it out" />
          </ButtonWrapper>
        </LinkResolver>
      </Content>
    </Card>
  );
}
