import { FC } from 'react';
import styled from 'styled-components';
import { PaddingContainer } from '../assets/DefaultStyles';

const FooterWrapper = styled.div`
  padding: 20px 0;
  font-size: 0.8rem !important;
`;

const Footer: FC = ({ children }) => {
  return (
    <FooterWrapper>
      <PaddingContainer>{children}</PaddingContainer>
    </FooterWrapper>
  );
};

export default Footer;
