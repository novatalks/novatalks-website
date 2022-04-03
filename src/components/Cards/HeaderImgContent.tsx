import React, { FC } from 'react';
import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  flex-flow: row nowrap;
  position: relative;
  margin: 2rem 0;
  width: 100%;
  height: 350px;
  text-align: center;
`;

const HeaderContentDiv = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-evenly;
  align-items: center;
  margin: 10px;
  width: 65%;
`;

const HeaderImgDiv = styled.div`
  position: relative;
  width: 35%;
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
