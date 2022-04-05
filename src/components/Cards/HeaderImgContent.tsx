import React, { FC } from 'react';
import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  margin: 2rem 0;
  width: 100%;
  text-align: center;
  @media (min-width: ${({ theme }) => theme.minSizes.small}) {
    flex-flow: row nowrap;
  }
  @media (min-width: ${({ theme }) => theme.minSizes.tablet}) {
    height: 350px;
  }
`;

const HeaderContentDiv = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-evenly;
  align-items: center;
  width: 65%;
  margin: 10px;
  overflow-wrap: break-word;

  @media (max-width: ${({ theme }) => theme.maxSizes.tablet}) {
    width: 100%;
    margin: 0;
    > * {
      inline-size: calc(100vw - 20%);
    }
  }
`;

const HeaderImgDiv = styled.div`
  position: relative;
  width: 100%;
  height: 80vw;
  @media (min-width: ${({ theme }) => theme.minSizes.small}) {
    width: 35%;
    height: unset;
  }
`;

export const HeaderImgContent: FC = ({ children }) => {
  return <Header>{children}</Header>;
};

export const HeaderContent: FC = ({ children }) => {
  return <HeaderContentDiv>{children}</HeaderContentDiv>;
};

export const HeaderImg: FC = ({ children }) => {
  return <HeaderImgDiv>{children}</HeaderImgDiv>;
};
