import styled from 'styled-components';

export const PaddingContainer = styled.div`
  width: inherit;
  padding: 0 10%;
`;

export const TopSpacedDiv = styled.div`
  padding-top: 30px;
`;

export const HeaderPadding = styled.div`
  height: ${({ theme }) => theme.headerHeight};
  width: 100%;
`;

export const Inverted = styled.span`
  ${({ theme }) => (theme.isDarkMode ? 'filter: invert(100%);' : '')};
`;

export const ImgBGWrapper = styled.div`
  background-color: ${({ theme }) => theme.body};
`;

export const ImgBGWrapperA = styled.a`
  background-color: ${({ theme }) => theme.body};
`;
// width: 1170px;
