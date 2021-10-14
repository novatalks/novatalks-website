import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import { IPage } from '../../helpers/interfaces';

import {
  linkResolver,
  hrefResolver,
  localePrismicToPath,
  localePos,
} from '../../helpers/prismic';

/* Position the front and back side */
const FlipCard = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
`;

const FlipFront = styled(FlipCard)`
  width: 40px;
  height: 40px;
  background-size: 40px;
  border-radius: 9999px;
  background-image: url('/images/pt.svg');
`;

const FlipBack = styled(FlipCard)`
  width: 40px;
  height: 40px;
  background-size: 40px;
  border-radius: 9999px;
  transform: rotateY(180deg);
  background-image: url('/images/en.svg');
`;

const SwitchIndicatorInner = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  text-align: center;
  transform-style: preserve-3d;
`;

const SwitchIndicator = styled.a`
  cursor: pointer;
  display: block;
  width: 40px;
  height: 40px;
`;

const SwitchInput = styled.input`
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  width: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;

  &:checked {
    ~ ${SwitchIndicator} > ${SwitchIndicatorInner} {
      > ${FlipFront} {
        background-image: url('/images/en.svg');
      }
      > ${FlipBack} {
        background-image: url('/images/pt.svg');
      }
    }
  }
`;

const SwitchOuter = styled.a`
  ${SwitchIndicator} > ${SwitchIndicatorInner} {
    ${props =>
      props.wasClicked ? '' : 'transition: transform ease-in-out 0.4s'};
  }
  &:hover {
    ${SwitchIndicator} > ${SwitchIndicatorInner} {
      ${props => (props.wasClicked ? '' : 'transform: rotateY(180deg)')};
    }
  }
`;

interface Props {
  pageType: IPage;
}

export default function Switcher({ pageType }: Props): JSX.Element {
  const [isChecked, setIsChecked] = useState(
    localePos(pageType.page.currentLang) !== 0
  );

  // one alternative language, could be altered for multiple
  if (
    pageType.page.alternativeLangs === null ||
    pageType.page.alternativeLangs[0] === null
  )
    return <>{}</>;
  const altLang = pageType.page.alternativeLangs[0];

  const router = useRouter();
  const handleHandler = altLang => {
    event.preventDefault();
    setIsClicked(true);
    setIsChecked(localePos(pageType.page.currentLang) === 0);
    router.push(hrefResolver(pageType), linkResolver(pageType), {
      locale: localePrismicToPath(altLang.lang),
    });
    return (event: React.MouseEvent) => {};
  };

  // Set isClicked until page refresh. Start as false.
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    setIsClicked(false);
  }, [router]);

  return (
    <>
      <SwitchOuter
        wasClicked={isClicked}
        onClick={() => {
          handleHandler(altLang);
        }}
      >
        <SwitchInput onChange={() => {}} checked={isChecked} type="checkbox" />
        <SwitchIndicator>
          <SwitchIndicatorInner>
            <FlipFront />
            <FlipBack />
          </SwitchIndicatorInner>
        </SwitchIndicator>
      </SwitchOuter>
    </>
  );
}
