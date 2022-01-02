import styled from 'styled-components';
import Image from 'next/image';
import React from 'react';
import { DarkMode } from 'use-dark-mode';
import Logo from '../../public/images/logo.svg';

import { IPage, PageTypeEnum } from '../helpers/interfaces';

import NavItem from './NavItem';
import Switcher from './Switcher/Switcher';
import SwitcherLang from './Switcher/SwitcherLang';

import { PaddingContainer, Inverted } from '../assets/DefaultStyles';
import { rootIPageFromLocale, LinkResolver } from '../helpers/prismic';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ theme }) => theme.headerHeight};
  width: calc(100% - 4px);
  z-index: 9999999;
  transition: 0.3s;
  position: fixed;
  left: 2px;
  top: 2px;
  background: ${({ theme }) => theme.body};
  border: solid ${({ theme }) => `${theme.defaultBorder} ${theme.text}`};
`;

const OuterWrapper = styled.div`
  height: ${({ theme }) => theme.headerHeight};
  position: absolute;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
`;

const NavbarList = styled.ul`
  display: flex;
  align-items: center;
`;

const SwitchersContainer = styled.div`
  display: flex;
  align-items: center;
  > :last-child {
    padding-left: 15px;
  }
`;

interface Props {
  title: string;
  pageType: IPage;
  darkMode: DarkMode;
}

export default function Header({
  title,
  pageType,
  darkMode,
}: Props): JSX.Element {
  return (
    <OuterWrapper>
      <HeaderContainer>
        <PaddingContainer>
          <Navbar>
            <Inverted>
              <LinkResolver
                page={rootIPageFromLocale(
                  pageType.page.currentLang,
                  PageTypeEnum.RootHome
                )}
              >
                <a>
                  <Image src={Logo} alt="Novatalks logo" height="60px" />
                </a>
              </LinkResolver>
            </Inverted>

            <NavbarList>
              <NavItem text="Events" href="/" />
              <NavItem text="Speakers" href="/speakers" />
              <NavItem text="About Us" href="/about" />
            </NavbarList>

            <SwitchersContainer>
              <Switcher darkMode={darkMode} />

              {(pageType.page.pageTypeEnum === PageTypeEnum.Root ||
                (pageType.page.alternativeLangs &&
                  pageType.page.alternativeLangs.length > 0)) && (
                <SwitcherLang pageType={{ page: pageType.page }} />
              )}
            </SwitchersContainer>
          </Navbar>
        </PaddingContainer>
      </HeaderContainer>
    </OuterWrapper>
  );
}
