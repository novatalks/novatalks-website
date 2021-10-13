import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import { ICompany } from '../../helpers/interfaces';
import { LinkResolver } from '../../helpers/prismic';

const TextDiv = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -2;
  height: 50px;
  width: ${({ theme }) => {
    return `${
      parseInt(theme.companyDivHeight, 10) -
      2 * parseInt(theme.defaultBorderLight, 10)
    }px`;
  }};
`;

const ImgWrapper = styled.div`
  background-color: ${({ theme }) => theme.body};
`;

const OuterWrapper = styled.a`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: end;
  height: ${({ theme }) => theme.companyDivHeight};
  border: ${({ theme }) => theme.defaultBorderLight} solid
    ${({ theme }) => theme.text};
  box-sizing: border-box;
  overflow: hidden;
  > :first-child {
    z-index: -1;
    transition: transform ${({ theme }) => theme.transitionSpeed} ease;
    max-width: ${({ theme }) => {
      return `${
        parseInt(theme.companyDivHeight, 10) -
        2 * parseInt(theme.defaultBorderLight, 10)
      }px`;
    }};
    min-width: ${({ theme }) => {
      return `${
        parseInt(theme.companyDivHeight, 10) -
        2 * parseInt(theme.defaultBorderLight, 10)
      }px`;
    }};
    max-height: ${({ theme }) => {
      return `${
        parseInt(theme.companyDivHeight, 10) -
        2 * parseInt(theme.defaultBorderLight, 10)
      }px`;
    }};
    min-height: ${({ theme }) => {
      return `${
        parseInt(theme.companyDivHeight, 10) -
        2 * parseInt(theme.defaultBorderLight, 10)
      }px`;
    }};
  }

  &:hover {
    > :first-child {
      transform: translateY(-50px);
    }
  }
`;

interface Props {
  company: ICompany;
}

export default function CompanyCard({ company }: Props): JSX.Element {
  return (
    <LinkResolver page={company} key={company.page.uid}>
      <OuterWrapper>
        <ImgWrapper>
          <Image
            src={company.image.url}
            alt={`${company.name} picture`}
            height={248}
            width={248}
            objectFit="cover"
          />
        </ImgWrapper>
        <TextDiv>
          <strong>{company.name}</strong>
        </TextDiv>
      </OuterWrapper>
    </LinkResolver>
  );
}
