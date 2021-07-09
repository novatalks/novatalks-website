import Link from 'next/link';
import styled from 'styled-components';

const StyledA = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
  background: none;
  padding: 15px;
  position: relative;
  border-top: ${({ theme }) => theme.defaultBorderLight} solid transparent;
  text-align: center;
  :hover {
    border-top-color: ${({ theme }) => theme.text};
  }
`;

const StyledLi = styled.li`
  list-style: none;
`;

interface ButtonProps {
  href: string;
  text: string;
}

export default function NavItem({ href = '/', text = '' }: ButtonProps) {
  return (
    <StyledLi>
      <Link href={href}>
        <StyledA>{text}</StyledA>
      </Link>
    </StyledLi>
  );
}
