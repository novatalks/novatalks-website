import styled from 'styled-components';

export const PaddingContainer = styled.div`
  width: inherit;
  padding: 0 10%;
`;

export const HeaderPadding = styled.div`
  height: ${({ theme }) => theme.headerHeight};
  width: 100%;
`;

export const Inverted = styled.span`
  ${({ theme }) => (theme.isDarkMode ? 'filter: invert(100%);' : '')};
`;

// width: 1170px;
